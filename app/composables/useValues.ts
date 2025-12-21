import { computed } from "vue";

export function useValues() {
  const values = computed(() => [
    {
      title: "Original idea",
      text: `London used to have internationally known Lindy Hop festivals before the pandemic. A combination of Covid, Black Lives Matter and a generational change of dancers has kept the London community more dispersed into smaller micro communities. This festival is organised by a variety of London teachers and organisers with a range of experience of managing a variety of scale events. This event is a reflection of what we have admired at other events and what we would like to see in our own city.`,
    },
    {
      title: "Our Vision",
      text: `With a variety of experiences between us we wanted to create an event that was more anchored in the values of community, accessibilty of knowlege, and celebration of the different facets of the Black art form we participate in. We want to work with artists near and far, and are prioritising participation and passion over perfection and posturing.`,
    },
    {
      title: "Acknowledgement",
      text: `Lindy Hop has always been a Black American dance, and created communities in a time of segregation. Black art culture is rooted in joy, embodiment, sharing, and being present. With this event we aim to move away from the Eurocentric perspective/culture imprinted on the community of expected progression, achievement, monetisation and 'fame'.`,
    },
    {
      title: "Black Voices & Anti Racism",
      text: `Lindy Hop grew despite of racism in all its forms, and oppression. Over time, Black dancers have been squeezed out by false historical narratives and the centring of white 'expertise'. The London community has some incredible Black dancers and still the overall community is majority white-passing. This organising team is also majority white-passing, and so has sought out Black British community leaders for paid consultation to ensure the Black experience is not erased and that we are not being thoughtless despite well intentioned.`,
    },
    {
      title: "Diversity & Inclusion",
      text: `Lindy Hop is a partnered dance, and often the gateway to solo jazz classes. By centring solo learning at this event, we hope attendees also see the benefits of this in their partnered dance enjoyments and movement confidence. Solo learning also helps remove the stress for primary follows who have historically spent more time on waiting lists for large events, when organisers attempt role balancing in classes. Relatedly, all partnered classes will be taught as ELEF (everybody leads, everybody follows), to help normalise what a lot of us alredy know; the dance roles have no gender. Aditionally, by removing the expectation of perfectionism in classes by maing them open level, we hope many attendees feel safer in learning about their own movement and the joy that comes with understanding your dance voice.`,
    },
    {
      title: "Freedom From Ego",
      text: `This event is not about levels, and the deliberate choice for classes to be open/all levels will prevent the heirarchies often created by levelled tracks. We hope participants honour the roots and spirit of the dance and not judge one another on what they believe they know about skill or levels. We are all here to learn something new, and it will look different to all of us. Unsolicited feedback is not welcomed, hyping up your fellow dancer is! If you are craving more of a challenge it is up to you to ask your teacher.`,
    },
    {
      title: "Cultural Awareness",
      text: `The UK wrote the guidebook on colonisation and systemic discrimination. We will have a talk with British tradition bearers and teachers on what it means to be in the UK dance community and how it has changed over time.`,
    },
    {
      title: "Top Line Code of Conduct",
      text: `Don't be a dick. Leave your ego at the door. Don't be racist, transphobic, homophobic, xenophobic, fatphobic or otherwise body size shaming, ableist. Recognise your priviledge, and the fact that priviledge isn't what you've personally gone through but what you HAVEN'T had to go through. If you have an issue with using a range of pronouns, seeing gender neutral toilets or if you've felt attacked by anything you've read on this page, this event is not for you. And no, we don't need to know about it.  However if this IS your jam, we'll see you soon :) `,
    },
  ]);

  return { values };
}
