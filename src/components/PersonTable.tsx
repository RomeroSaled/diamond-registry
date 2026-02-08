import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DiamondLogo } from "./DiamondLogo";
import { supabase } from "@/integrations/supabase/client";
import { Diamond } from "lucide-react";

interface Persona {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  fecha_nacimiento: string | null;
  direccion: string | null;
  ciudad: string | null;
  created_at: string;
}

interface PersonTableProps {
  onNewRegistro: () => void;
}

export const PersonTable = ({ onNewRegistro }: PersonTableProps) => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonas = async () => {
      const { data, error } = await supabase
        .from("personas")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPersonas(data);
      }
      setLoading(false);
    };

    fetchPersonas();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("es-ES");
  };

  return (
    <div className="min-h-screen bg-rose-soft-gradient relative overflow-hidden">
      {/* Background diamond pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <Diamond className="w-[600px] h-[600px] text-primary" strokeWidth={0.5} />
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
        <DiamondLogo size="lg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-20 md:pt-16 p-4 md:p-8">
        <div className="card-diamond">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Personas Registradas
              </h1>
              <p className="text-muted-foreground">
                {personas.length} registro{personas.length !== 1 ? "s" : ""} encontrado{personas.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button onClick={onNewRegistro} className="btn-diamond">
              💎 Registrar Nueva Persona
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Diamond className="w-12 h-12 mx-auto text-primary animate-pulse" />
              <p className="text-muted-foreground mt-4">Cargando registros...</p>
            </div>
          ) : personas.length === 0 ? (
            <div className="text-center py-12">
              <Diamond className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg">No hay personas registradas aún</p>
              <p className="text-muted-foreground/70 text-sm mt-1">
                Haz clic en "Registrar Nueva Persona" para comenzar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">Nombre</TableHead>
                    <TableHead className="font-semibold">Apellido</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Teléfono</TableHead>
                    <TableHead className="font-semibold">Fecha Nac.</TableHead>
                    <TableHead className="font-semibold">Ciudad</TableHead>
                    <TableHead className="font-semibold">Registrado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personas.map((persona) => (
                    <TableRow key={persona.id} className="hover:bg-secondary/30 transition-colors">
                      <TableCell className="font-medium">{persona.nombre}</TableCell>
                      <TableCell>{persona.apellido}</TableCell>
                      <TableCell className="text-muted-foreground">{persona.email}</TableCell>
                      <TableCell>{persona.telefono || "-"}</TableCell>
                      <TableCell>{formatDate(persona.fecha_nacimiento)}</TableCell>
                      <TableCell>{persona.ciudad || "-"}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(persona.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
