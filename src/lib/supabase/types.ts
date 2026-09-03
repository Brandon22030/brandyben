export type Pole = "dev" | "batiment" | "indetermine";
/** projects.pole et services.pole n'utilisent que ces deux valeurs. */
export type PoleMetier = "dev" | "batiment";
export type StatutContenu = "brouillon" | "publie";
export type StatutDemande =
  | "nouveau"
  | "en_cours"
  | "devis_envoye"
  | "gagne"
  | "perdu"
  | "archive";

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          nom: string;
          secteur: string | null;
          ville: string | null;
          contact: string | null;
          email: string | null;
          telephone: string | null;
          site: string | null;
          logo_url: string | null;
          visible_sur_site: boolean;
          notes_internes: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["clients"]["Row"]> & { nom: string };
        Update: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          titre: string;
          slug: string;
          client_id: string | null;
          pole: PoleMetier;
          resume: string | null;
          contenu: string | null;
          images: string[];
          lien: string | null;
          statut: StatutContenu;
          ordre: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          titre: string;
          slug: string;
          pole: PoleMetier;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      quote_requests: {
        Row: {
          id: string;
          nom: string;
          email: string;
          telephone: string | null;
          pole: Pole;
          message: string;
          statut: StatutDemande;
          note_interne: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["quote_requests"]["Row"]> & {
          nom: string;
          email: string;
          pole: Pole;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["quote_requests"]["Row"]>;
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          client_id: string | null;
          auteur: string;
          fonction: string | null;
          note: number | null;
          citation: string;
          photo_url: string | null;
          statut: StatutContenu;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          auteur: string;
          citation: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "testimonials_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "clients";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          id: string;
          titre: string;
          slug: string;
          extrait: string | null;
          contenu: string | null;
          couverture: string | null;
          statut: StatutContenu;
          published_at: string | null;
          auteur: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["posts"]["Row"]> & {
          titre: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Row"]>;
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          pole: PoleMetier;
          titre: string;
          description: string | null;
          benefice: string | null;
          ordre: number;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          pole: PoleMetier;
          titre: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: [];
      };
      settings: {
        Row: {
          id: number;
          rccm: string | null;
          ifu: string | null;
          adresse: string | null;
          telephone: string | null;
          email: string | null;
          horaires: string | null;
          hebergeur: string | null;
          reseaux: Record<string, string> | null;
        };
        Insert: Partial<Database["public"]["Tables"]["settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["settings"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      pole: Pole;
      statut_contenu: StatutContenu;
      statut_demande: StatutDemande;
    };
    CompositeTypes: Record<string, never>;
  };
}
