export const PASS_TYPES = [
  {
    label: "Full pass (Early-bird)",
    value: "full-early",
    price: 195,
    icon: "lucide:star",
    tag: "full",
    quantity: 50,
  },
  {
    label: "Full pass",
    value: "full",
    price: 215,
    icon: "lucide:ticket",
    tag: "full",
    quantity: 100,
  },
  {
    label: "Full pass (Late)",
    value: "full-late",
    price: 235,
    icon: "lucide:ticket",
    tag: "full",
    quantity: 50,
  },
  {
    label: "Party pass",
    value: "party",
    price: 90,
    icon: "lucide:party-popper",
    tag: "party",
    quantity: 150,
  },
  {
    label: "Sold out",
    value: "sold-out",
    price: 0,
    icon: "lucide:slash",
    tag: "sold-out",
    quantity: 9999,
  },
];

export const HOSTING_OPTIONS = [
  {
    label: "I do not need hosting",
    value: "no-hosting",
    icon: "mdi:home-outline",
  },
  { label: "I can host", value: "i-can-host", icon: "mdi:home-heart" },
  { label: "I need hosting", value: "need-hosting", icon: "mdi:home-off" },
  {
    label: "I cannot come without being hosted",
    value: "cannot-come-without",
    icon: "mdi:home-remove",
  },
];

export const INSTRUMENT_OPTIONS = [
  "Saxophone",
  "Trumpet",
  "Trombone",
  "Piano",
  "Bass",
  "Drums",
  "Guitar",
  "Vocals",
];

export const MERCH_OPTIONS = [
  { label: "XS", value: "xs", price: 15 },
  { label: "S", value: "s", price: 15 },
  { label: "M", value: "m", price: 15 },
  { label: "L", value: "l", price: 15 },
  { label: "XL", value: "xl", price: 15 },
  { label: "XXL", value: "xxl", price: 15 },
];

export const PRONOUN_OPTIONS = [
  "She/Her",
  "He/Him",
  "They/Them",
  "Ze/Hir",
  "Other",
];

export const ROLE_OPTIONS = [
  { label: "Lead", value: "lead" },
  { label: "Follow", value: "follow" },
  { label: "Switch", value: "switch" },
];

export const VOLUNTEERING_OPTIONS = [
  { label: "Yes, I would like to volunteer", value: true },
  { label: "No, I am not able to volunteer", value: false },
];

export const COMMUNITY_OPTIONS = [
  {
    value: "organiser",
    label: "I organise dance events",
  },
  {
    value: "dj",
    label: "I am a DJ",
  },
  {
    value: "teacher",
    label: "I teach",
  },
  {
    value: "motivator",
    label: "I motivate people to attend socials",
  },
  {
    value: "volunteer",
    label: "I volunteer at events",
  },
  {
    value: "regular-classes",
    label: "I go to dance classes regularly",
  },
  {
    value: "regular-festivals",
    label: "I attend dance festivals regularly",
  },
  {
    value: "in-a-troupe",
    label: "I am in a troupe",
  },
];

export const PIF_OPTIONS = [
  { id: "none", name: "None", value: 0 },
  { id: "donate-10", name: "+£10 sustainable top up", value: 10 },
  { id: "donate-20", name: "+£20 sustainable top up", value: 20 },
  { id: "donate-30", name: "+£30 sustainable top up", value: 30 },
  { id: "request-10", name: "£10 discount (request support)", value: -10 },
  { id: "request-20", name: "£20 discount (request support)", value: -20 },
  { id: "request-30", name: "£30 discount (request support)", value: -30 },
];

export const TRAVEL_OPTIONS = [
  { label: "I travel over land", value: "by-land" },
  { label: "Normally I'd fly but coming by land", value: "would-normally-fly" },
  { label: "I will come by plane", value: "by-plane" },
];
