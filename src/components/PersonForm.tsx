import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiamondLogo } from "./DiamondLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const personaSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es requerido").max(100),
  apellido: z.string().trim().min(1, "El apellido es requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  telefono: z.string().trim().max(20).optional(),
  fecha_nacimiento: z.string().optional(),
  direccion: z.string().trim().max(500).optional(),
  ciudad: z.string().trim().max(100).optional(),
});

interface PersonFormProps {
  onViewRegistros: () => void;
}

export const PersonForm = ({ onViewRegistros }: PersonFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    ciudad: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = personaSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Error de validación",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const { error } = await supabase.from("personas").insert({
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim() || null,
      fecha_nacimiento: formData.fecha_nacimiento || null,
      direccion: formData.direccion.trim() || null,
      ciudad: formData.ciudad.trim() || null,
    });
    
    setLoading(false);
    
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el registro",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "✨ Registro Completo",
      description: "La persona ha sido registrada exitosamente",
    });
    
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      fecha_nacimiento: "",
      direccion: "",
      ciudad: "",
    });
  };

  return (
    <div className="min-h-screen bg-rose-gradient p-4 md:p-8">
      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <DiamondLogo size="lg" />
      </div>

      <div className="max-w-2xl mx-auto pt-20 md:pt-16">
        <div className="card-diamond">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Registro de Personas
            </h1>
            <p className="text-muted-foreground">
              Complete el formulario para registrar una nueva persona
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Calle, número, colonia..."
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ciudad"
                className="bg-background"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="btn-diamond flex-1"
              >
                {loading ? "Guardando..." : "💎 Guardar"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onViewRegistros}
                className="flex-1 border-primary text-primary hover:bg-secondary"
              >
                Ver Personas Registradas
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
