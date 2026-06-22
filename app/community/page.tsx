import ImageTextCTASection from "../components/ImageTextCTASection";

export default function CommunityPage() {
  return (
    <main className="flex w-full flex-1 flex-col justify-center px-0 py-0">
      <section className="w-full space-y-2">
        <ImageTextCTASection
          imageSrc="/mainpage/image/TournamentPosterbg.png"
          imageAlt="Titan Arena"
          title="Tournament #4: Hostile Titan Inbound"
          description="Race for the Next Championship."
          buttonLabel="Sign Up Now"
          buttonHref="https://discord.com/invite/starvaultvr"
          contentAlign="left"
          topFade={false}
        />

        <ImageTextCTASection
          imageSrc="/mainpage/image/SmithNight.png"
          imageAlt="Heroes"
          title="Creator Program"
          description="Get special access & unique perks"
          buttons={[
            { label: "Join Program", href: "https://docs.google.com/forms/d/e/1FAIpQLSeMybkBE7i8CuljngQlQcrxru3C6t7klvFoIIIQ8ctjzHoM9Q/viewform?usp=sharing&ouid=101967005538578431279" },
            { label: "Creator Kit", href: "https://drive.google.com/drive/folders/1kFXrvGUwdOO08bAIZWEDMGjMxJRfW0Ub?usp=sharing" },
          ]}
          contentAlign="right"
          overlayBottomClassName = "bottom-18"
        />

        <ImageTextCTASection
          imageSrc="/mainpage/image/TitanArena2.jpg"
          imageAlt="Titan Arena"
          title="Join the Community"
          description="Find your place among fellow gamers."
          buttonLabel="Starvault Discord"
          buttonHref="https://discord.com/invite/starvaultvr"
          contentAlign="left"
          overlayBottomClassName = "bottom-2"
        />
      </section>
    </main>
  );
}
