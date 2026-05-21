import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Modelo2t() {
  const [busca, setBusca] = useState("");

  return (
    <div className="min-h-screen bg-background border-2 border-foreground flex flex-col">
      {/* Barra Dashboard + Campo de Busca */}
      <header className="flex border-b-2 border-foreground">
        <div className="flex-1 flex items-center px-6 py-4">
          <h1 className="text-xl font-bold tracking-wide">BARRA DASHBOARD</h1>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-l-2 border-foreground">
          <Input
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-48"
          />
          <Button size="sm">
            <Search className="h-4 w-4 mr-1" />
            Buscar
          </Button>
        </div>
      </header>

      {/* Área de Visualização das Informações */}
      <main className="flex-1 flex items-center justify-center p-8">
        <p className="text-lg font-bold text-muted-foreground">
          VISUALIZAÇÃO DAS INFORMAÇÕES
        </p>
      </main>
    </div>
  );
}