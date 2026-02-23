import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

export default function Terms() {
  useCanonical('/terms');

  useEffect(() => {
    document.title = "Terms of Service | Etienne Agency";
  }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-8">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing or using the Etienne Agency website, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use our website.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">2. Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Etienne Agency provides AI receptionist and appointment scheduling automation services for
              multi-location service businesses. Specific service terms are outlined in individual client agreements.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">3. Use of Website</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use this website only for lawful purposes. You may not use the site in any way that
              could damage, disable, or impair its functionality, or interfere with any other party's use.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content on this website — including text, graphics, logos, and software — is the property of
              Etienne Agency and protected by applicable intellectual property laws.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Etienne Agency is not liable for any indirect, incidental, or consequential damages arising from
              your use of this website. Our total liability is limited to the amount you paid us, if any.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">6. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update these terms from time to time. Continued use of the website after changes constitutes
              acceptance of the updated terms.
            </p>

            <h2 className="font-display text-2xl text-foreground mt-10 mb-4">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:jim@etienneagency.com" className="text-primary hover:text-primary/80">jim@etienneagency.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
