import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@salahudin",
    icon: Icons.gitHub,
    link: "https://github.com/Shabuabbasi",
  },

  {
    name: "LinkedIn",
    username: "Salahudin",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/salahudin-abbasi-378512308?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

  {
    name: "Twitter",
    username: "@salahudin124",
    icon: Icons.twitter,
    link: "https://x.com/salahudin124",
  },

  {
    name: "Gmail",
    username: "salahudinabbasi",
    icon: Icons.gmail,
    link: "mailto:salahudinabbasi733@gmail.com",
  },

];

