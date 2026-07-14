import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";

import { ContactForm } from "@/components/forms/contact-form";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center">
        <div className="w-full max-w-xl">
          <ContactForm />
        </div>
      </div>
    </PageContainer>
  );
}
