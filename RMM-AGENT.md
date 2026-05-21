# Agente RMM - Sistema de Monitoramento Remoto

Este script coleta informações do computador do usuário e as envia para o sistema de monitoramento.

## Requisitos

- **Windows**: PowerShell 5.0+
- **Linux/Mac**: Python 3.7+

## Instalação Windows (PowerShell)

```powershell
# Salvar como: rmm-agent.ps1

param(
  [string]$ApiUrl = "http://localhost:3001/api",
  [string]$UsuarioId = "seu-usuario-id"
)

function Get-SystemInfo {
  $os = Get-WmiObject win32_operatingsystem
  $cpu = Get-WmiObject win32_processor | Select-Object -First 1
  $disk = Get-PSDrive C
  $mem = Get-WmiObject win32_operatingsystem

  return @{
    nome_dispositivo = $env:COMPUTERNAME
    so = "Windows"
    versao_so = $os.Version
    ip_address = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notmatch "Loopback"} | Select-Object -First 1).IPAddress
    cpu = $cpu.Name
    ram = "{0} GB" -f ([math]::Round($mem.TotalVisibleMemorySize / 1MB))
    disco = "{0} GB" -f ([math]::Round($disk.Used / 1GB))
    cpu_uso = (Get-WmiObject win32_processor).LoadPercentage
    ram_uso = [math]::Round(($mem.TotalVisibleMemorySize - $mem.FreePhysicalMemory) / $mem.TotalVisibleMemorySize * 100)
    disco_uso = [math]::Round(($disk.Used / $disk.Used + $disk.Free) * 100)
  }
}

function Send-ToApi {
  param([hashtable]$Data)
  
  $json = $Data | ConvertTo-Json
  $headers = @{"Content-Type" = "application/json"}
  
  try {
    $response = Invoke-WebRequest -Uri "$ApiUrl/dispositivos/registrar" `
      -Method POST `
      -Headers $headers `
      -Body $json
    
    Write-Host "✓ Dados enviados com sucesso" -ForegroundColor Green
    return $response.StatusCode -eq 201
  } catch {
    Write-Host "✗ Erro ao enviar dados: $_" -ForegroundColor Red
    return $false
  }
}

# Main loop
while ($true) {
  Write-Host "Coletando dados do sistema..." -ForegroundColor Cyan
  
  $info = Get-SystemInfo
  $info.usuario_id = $UsuarioId
  
  Send-ToApi $info
  
  # Aguardar 5 minutos antes de próxima coleta
  Start-Sleep -Seconds 300
}
```

## Instalação Linux/Mac (Python)

```bash
#!/bin/bash
# Salvar como: rmm-agent.py

import requests
import psutil
import socket
import platform
import time
import json
from datetime import datetime

class RMMAgent:
    def __init__(self, api_url, usuario_id):
        self.api_url = api_url
        self.usuario_id = usuario_id
        self.intervalo = 300  # 5 minutos
    
    def get_system_info(self):
        """Coleta informações do sistema"""
        return {
            'nome_dispositivo': socket.gethostname(),
            'so': platform.system(),
            'versao_so': platform.release(),
            'ip_address': socket.gethostbyname(socket.gethostname()),
            'cpu': platform.processor(),
            'ram': f"{round(psutil.virtual_memory().total / (1024**3))} GB",
            'disco': f"{round(psutil.disk_usage('/').total / (1024**3))} GB",
            'cpu_uso': psutil.cpu_percent(interval=1),
            'ram_uso': psutil.virtual_memory().percent,
            'disco_uso': psutil.disk_usage('/').percent,
            'temperatura': self.get_temperatura(),
            'usuario_id': self.usuario_id
        }
    
    def get_temperatura(self):
        """Tenta obter temperatura do processador"""
        try:
            temps = psutil.sensors_temperatures()
            if temps and 'coretemp' in temps:
                return round(temps['coretemp'][0].current)
            return None
        except:
            return None
    
    def send_data(self, data):
        """Envia dados para a API"""
        try:
            headers = {'Content-Type': 'application/json'}
            response = requests.post(
                f"{self.api_url}/dispositivos/registrar",
                json=data,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 201:
                print("✓ Dados enviados com sucesso")
                return True
            else:
                print(f"✗ Erro: Status {response.status_code}")
                return False
        except Exception as e:
            print(f"✗ Erro ao enviar: {str(e)}")
            return False
    
    def run(self):
        """Executa o agente continuamente"""
        print("🤖 RMM Agent iniciado")
        
        while True:
            try:
                print(f"[{datetime.now()}] Coletando dados...")
                info = self.get_system_info()
                
                print(f"  CPU: {info['cpu_uso']}%")
                print(f"  RAM: {info['ram_uso']}%")
                print(f"  Disco: {info['disco_uso']}%")
                
                self.send_data(info)
                
                print(f"Próxima coleta em {self.intervalo} segundos...\n")
                time.sleep(self.intervalo)
                
            except KeyboardInterrupt:
                print("\n⚠ Agente parado pelo usuário")
                break
            except Exception as e:
                print(f"Erro: {str(e)}")
                time.sleep(self.intervalo)

if __name__ == "__main__":
    import sys
    
    api_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3001/api"
    usuario_id = sys.argv[2] if len(sys.argv) > 2 else "seu-usuario-id"
    
    agent = RMMAgent(api_url, usuario_id)
    agent.run()
```

## Uso

### Windows
```powershell
# PowerShell com privilégios de admin
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\rmm-agent.ps1 -UsuarioId "seu-id-aqui"
```

### Linux/Mac
```bash
chmod +x rmm-agent.py
pip install requests psutil
python3 rmm-agent.py http://localhost:3001/api seu-id-aqui
```

## Instalação como Serviço

### Windows (Task Scheduler)
```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\rmm-agent.ps1"
$trigger = New-ScheduledTaskTrigger -AtStartup
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "RMM-Agent" -RunLevel Highest
```

### Linux (Cron)
```bash
# crontab -e
@reboot /usr/bin/python3 /opt/rmm-agent.py http://api-url seu-id &
```

## Dados Coletados

- ✓ Nome do dispositivo
- ✓ Sistema operacional
- ✓ Versão do SO
- ✓ Endereço IP
- ✓ Modelo do CPU
- ✓ Total de RAM
- ✓ Total de disco
- ✓ % Utilização de CPU
- ✓ % Utilização de RAM
- ✓ % Utilização de disco
- ✓ Temperatura do processador

## Segurança

- Usar HTTPS em produção
- Armazenar credenciais com segurança
- Validar certificados SSL
- Implementar rate limiting

## Troubleshooting

**Problema**: Permissão negada
**Solução**: Execute com privilégios elevados (sudo ou Admin)

**Problema**: Conexão recusada
**Solução**: Verifique se o servidor backend está rodando

**Problema**: Dados não aparecem
**Solução**: Verifique o ID do usuário e URL da API
