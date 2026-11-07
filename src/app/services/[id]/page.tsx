import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/cleaningData";
import ServiceDetailClient from "@/components/ServiceDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES_DATA.find((s) => s.id === id || s.slug === id);

  if (!service) {
    return {
      title: "Service Not Found | Let's C Cleaning",
    };
  }

  return {
    title: `${service.title} in Kozhikode | Let's C Cleaning Services`,
    description: `${service.shortDesc} ${service.estimate} with 4.9-star Google rating across Thamarassery and Kozhikode.`,
    openGraph: {
      title: `${service.title} | Let's C Cleaning Services`,
      description: service.shortDesc,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = SERVICES_DATA.find((s) => s.id === id || s.slug === id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
