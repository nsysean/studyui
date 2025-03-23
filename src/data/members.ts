// data/users.ts
import dbConnect from '../lib/mongo';
import User, { IUser } from '../models/user';

export const getUsers = async () => {
  await dbConnect();
  return User.find().lean();
};

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  joinDate: string;
  bio: string;
  links?: {
    type: "website" | "github" | "twitter" | "email";
    url: string;
  }[];
  solves: number;
  score: number;
}

export const members: Member[] = [
  {
    id: "unvariant",
    name: "unvariant",
    avatar: "https://ext.same-assets.com/163175198/710045441.png",
    joinDate: "May 2023",
    bio: "Good at everything low level. Orz pwner. Really chill dude.",
    links: [
      { type: "website", url: "https://unvariant.pages.dev/" },
      { type: "github", url: "https://github.com/unvariant" },
    ],
    solves: 28,
    score: 2840,
  },
  {
    id: "flocto",
    name: "flocto",
    avatar: "https://ext.same-assets.com/163175198/1214099974.png",
    joinDate: "April 2023",
    bio: "FLOCTO FLOCTO FLOCTO FLOCTO. orz esolang rev and everything.",
    links: [
      { type: "website", url: "https://flocto.github.io/" },
      { type: "github", url: "https://github.com/flocto" },
    ],
    solves: 24,
    score: 2350,
  },
  {
    id: "stuxf",
    name: "stuxf",
    avatar: "https://ext.same-assets.com/163175198/3211721146.png",
    joinDate: "May 2023",
    bio: "bonk. Does a mix of everything (badly), part of Les Amateurs.",
    links: [
      { type: "website", url: "https://stuxf.dev" },
      { type: "github", url: "https://github.com/stuxf" },
      { type: "email", url: "mailto:hello@stuxf.dev" },
    ],
    solves: 23,
    score: 2180,
  },
  {
    id: "enscribe",
    name: "enscribe",
    avatar: "https://ext.same-assets.com/163175198/4038127349.png",
    joinDate: "April 2023",
    bio: "d(-_-)b",
    links: [
      { type: "website", url: "https://enscribe.dev" },
      { type: "github", url: "https://github.com/jktrn" },
      { type: "twitter", url: "https://twitter.com/enscry" },
      { type: "email", url: "mailto:jason@enscribe.dev" },
    ],
    solves: 21,
    score: 1950,
  },
  {
    id: "kroot",
    name: "kroot",
    avatar: "https://ext.same-assets.com/2730305006/550479592.png",
    joinDate: "April 2023",
    bio: "skibidi sigma",
    links: [
      { type: "website", url: "https://kroot.me" },
      { type: "github", url: "https://github.com/nootkroot" },
      { type: "twitter", url: "https://x.com/nootkroot" },
      { type: "email", url: "mailto:ariel@kroot.me" },
    ],
    solves: 19,
    score: 1780,
  },
  {
    id: "cope",
    name: "cope",
    avatar: "https://ext.same-assets.com/163175198/2231149719.png",
    joinDate: "May 2024",
    bio: "Does pwn, lots of brainrot.",
    links: [],
    solves: 17,
    score: 1720,
  },
  {
    id: "rench",
    name: "Rench",
    avatar: "https://ext.same-assets.com/163175198/2123948736.png",
    joinDate: "May 2023",
    bio: "Impls unvariant's mind solves. Has spent a concerningly high percentage of lifetime staring at gdb. The team's diversity hire.",
    links: [
      { type: "website", url: "https://rench.me/" },
      { type: "github", url: "https://github.com/renchtg" },
    ],
    solves: 16,
    score: 1680,
  },
  {
    id: "smashmaster",
    name: "smashmaster",
    avatar: "https://ext.same-assets.com/163175198/628337558.png",
    joinDate: "October 2023",
    bio: "Webber with many interests. Makes an ungodly amount of git repos and commits",
    links: [{ type: "github", url: "https://github.com/javaarchive" }],
    solves: 14,
    score: 1450,
  },
  {
    id: "zerodaytea",
    name: "ZeroDayTea",
    avatar: "https://ext.same-assets.com/163175198/2792785969.png",
    joinDate: "February 2024",
    bio: "systems, compilers, and theoretical physics. also theoretically a CTFer",
    links: [
      { type: "website", url: "https://patrickdobranowski.com/" },
      { type: "github", url: "https://github.com/ZeroDayTea" },
    ],
    solves: 13,
    score: 1320,
  },
  {
    id: "chara",
    name: "Chara",
    avatar: "https://ext.same-assets.com/163175198/1025526521.png",
    joinDate: "September 2024",
    bio: "New member and good at web! We would not be surprised if Chara is a spy.",
    links: [{ type: "github", url: "https://github.com/chara0x" }],
    solves: 11,
    score: 1050,
  },
  {
    id: "helloperson",
    name: "HELLOPERSON",
    avatar: "https://ext.same-assets.com/163175198/1115188017.png",
    joinDate: "May 2023",
    bio: "GUESS GOD. And really shit at crypto and math. not a communist",
    links: [{ type: "github", url: "https://github.com/hellopir2" }],
    solves: 10,
    score: 980,
  },
  {
    id: "ani",
    name: "ani",
    avatar: "",
    joinDate: "April 2023",
    bio: "Really fast at doing web stuff.",
    links: [],
    solves: 9,
    score: 850,
  },
];

// Get member by ID
export const getMemberById = (id: string): Member | undefined => {
  return members.find((member) => member.id === id);
};

// Get top members by score
export const getTopMembers = (limit: number = 10): Member[] => {
  return [...members].sort((a, b) => b.score - a.score).slice(0, limit);
};
