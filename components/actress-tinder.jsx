"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TinderCard from "react-tinder-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ArrowUp, ArrowDown, Trophy, Heart, X } from "lucide-react";
import Link from "next/link";

const initialActresses = [
  {
    id: 1,
    name: "Emma Stone",
    age: 32,
    maritalStatus: "Married",
    hotnessScore: 95,
    image: "/Emma-Watson.jpg",
    bio: "La La Land's sweetheart with a side of sarcasm. Will trade Oscar for pizza.",
    funFact:
      "Can juggle flaming torches while reciting Shakespeare... or so she claims.",
    quirk: "Allergic to bad puns, may sneeze uncontrollably.",
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    age: 36,
    maritalStatus: "Divorced",
    hotnessScore: 97,
    image: "/scarlett-johansson.jpg",
    bio: "Black Widow by day, karaoke queen by night. Fluent in Russian... and sass.",
    funFact:
      "Once outran paparazzi in 6-inch heels. Superhero training pays off!",
    quirk:
      "Has a secret collection of rubber ducks dressed as Marvel characters.",
  },
  {
    id: 3,
    name: "Jennifer Lawrence",
    age: 30,
    maritalStatus: "Single",
    hotnessScore: 94,
    image: "/Jennifer-Lawrence.jpg",
    bio: "The girl on fire who'll trip on her way to the stage but make you love her for it.",
    funFact:
      "Once snuck into her own movie premiere in disguise just to watch her fans react.",
    quirk:
      "Obsessed with Doritos. Has probably eaten more of them than anyone in Hollywood.",
  },
  {
    id: 4,
    name: "Margot Robbie",
    age: 31,
    maritalStatus: "Married",
    hotnessScore: 96,
    image: "/Margot-Robbie.jpg",
    bio: "Harley Quinn by profession, surfer girl at heart. Can nail any accent you throw at her.",
    funFact:
      "Has a tattoo kit and gave 20 people (including herself) 'SKWAD' tattoos on the set of Suicide Squad.",
    quirk:
      "Loves to prank her co-stars with fake spiders. May terrify you on set.",
  },
  {
    id: 5,
    name: "Gal Gadot",
    age: 36,
    maritalStatus: "Married",
    hotnessScore: 98,
    image: "/Gal-Gadot.jpg",
    bio: "Wonder Woman in real life and on screen. Kicking butt and spreading kindness wherever she goes.",
    funFact:
      "Served two years in the Israeli army and still does her own stunts.",
    quirk:
      "Has a weakness for Nutella. Might even trade her Lasso of Truth for a jar.",
  },
  {
    id: 6,
    name: "Natalie Portman",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 95,
    image: "/Natalie-Portman.jpg",
    bio: "Queen Amidala and Harvard graduate. Your friendly neighborhood genius and Jedi.",
    funFact:
      "Published a scientific paper while still in high school. A true science nerd at heart.",
    quirk:
      "Keeps a lightsaber in her closet just in case the Empire strikes back.",
  },
  {
    id: 7,
    name: "Charlize Theron",
    age: 45,
    maritalStatus: "Single",
    hotnessScore: 94,
    image: "/Charlize-Theron.jpg",
    bio: "Atomic Blonde with a heart of gold. Can out-act and out-fight anyone on screen.",
    funFact:
      "Once trained with real MMA fighters for a role and can now throw a mean punch.",
    quirk:
      "Keeps an extensive collection of action figures, including a mini version of herself.",
  },
  {
    id: 8,
    name: "Anne Hathaway",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 92,
    image: "/Anne-Hathaway.jpg",
    bio: "From Princess Diaries to Les Misérables, she's always a class act with a killer smile.",
    funFact:
      "Learned to ride a motorcycle for a role and loved it so much she got her own.",
    quirk:
      "Has a weird habit of naming all her houseplants after Shakespearean characters.",
  },
  {
    id: 9,
    name: "Angelina Jolie",
    age: 46,
    maritalStatus: "Divorced",
    hotnessScore: 90,
    image: "/Angelina-Jolie.jpg",
    bio: "Tomb Raider, humanitarian, and mother to many. Equal parts fierce and compassionate.",
    funFact: "Owns a private pilot's license and often flies her own planes.",
    quirk: "Has a collection of daggers and used to play with them as a kid.",
  },
  {
    id: 10,
    name: "Keira Knightley",
    age: 36,
    maritalStatus: "Married",
    hotnessScore: 91,
    image: "/Keira-Knightley.jpg",
    bio: "Pirates of the Caribbean’s sword-wielding beauty. Master of historical dramas.",
    funFact:
      "Once had a sword fight with her stunt double during a break on set.",
    quirk:
      "Can’t watch herself on screen and prefers to avoid her own movie premieres.",
  },
  {
    id: 11,
    name: "Emily Blunt",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 93,
    image: "/Emily-Blunt.jpg",
    bio: "From horror in A Quiet Place to comedy in The Devil Wears Prada, she can do it all.",
    funFact: "Was once a stutterer, and acting helped her overcome it.",
    quirk: "Loves making up ridiculous accents just to prank her friends.",
  },
  {
    id: 12,
    name: "Emma Watson",
    age: 31,
    maritalStatus: "Single",
    hotnessScore: 95,
    image: "/Emma-Watson.jpg",
    bio: "Hermione Granger turned global activist. Brains, beauty, and books, she's the whole package.",
    funFact:
      "Graduated from Brown University while balancing her acting career.",
    quirk:
      "Can quote entire passages from Harry Potter by heart. Will duel you in trivia.",
  },
  {
    id: 13,
    name: "Zendaya",
    age: 25,
    maritalStatus: "Single",
    hotnessScore: 97,
    image: "/Zendaya.jpg",
    bio: "From Disney Channel to Dune, the multi-talented starlet is redefining Hollywood cool.",
    funFact:
      "Started her career as a fashion model before taking over screens worldwide.",
    quirk:
      "Has a phobia of tiny holes—yes, really! Don’t show her a honeycomb.",
  },
  {
    id: 14,
    name: "Jessica Chastain",
    age: 44,
    maritalStatus: "Married",
    hotnessScore: 90,
    image: "/Jessica-Chastain.jpg",
    bio: "Zero Dark Thirty’s fearless heroine. Classic beauty meets acting powerhouse.",
    funFact: "Became a vegan at age 12 and is an animal rights advocate.",
    quirk:
      "Has a ritual of drinking a big glass of beet juice before every red carpet appearance.",
  },
  {
    id: 15,
    name: "Mila Kunis",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 93,
    image: "/Mila-Kunis.jpg",
    bio: "From That '70s Show to Bad Moms, her comedic timing is impeccable.",
    funFact:
      "Lied about her age to get her role on That '70s Show—she was only 14!",
    quirk:
      "Is obsessed with World of Warcraft and once had to take a break to stop playing.",
  },
  {
    id: 16,
    name: "Kate Winslet",
    age: 45,
    maritalStatus: "Married",
    hotnessScore: 92,
    image: "/Kate-Winslet.jpg",
    bio: "Rose from Titanic and one of the greatest actresses of her generation. Can make you cry on cue.",
    funFact:
      "Once said she can hold her breath underwater for 7 minutes after training for a role.",
    quirk: "Loves knitting on movie sets—makes scarves for all her co-stars.",
  },
  {
    id: 17,
    name: "Saoirse Ronan",
    age: 27,
    maritalStatus: "Single",
    hotnessScore: 89,
    image: "/Saoirse-Ronan.jpg",
    bio: "Irish wonder who’s mastered the art of indie films and Oscar nominations.",
    funFact:
      "Can perfectly mimic an American accent, but still struggles with her own name pronunciation.",
    quirk:
      "Collects quirky teapots from around the world and serves tea during interviews.",
  },
  {
    id: 18,
    name: "Blake Lively",
    age: 34,
    maritalStatus: "Married",
    hotnessScore: 94,
    image: "/Blake-Lively.jpg",
    bio: "Gossip Girl queen turned fashion icon, she lights up both the screen and the runway.",
    funFact:
      "Bakes elaborate cakes for her friends and family, often themed around her movies.",
    quirk:
      "Has an obsessive love for designing her home—interior decorating is her true passion.",
  },
  {
    id: 19,
    name: "Salma Hayek",
    age: 55,
    maritalStatus: "Married",
    hotnessScore: 90,
    image: "/Salma-Hayek.jpg",
    bio: "From Frida to Marvel, she’s a powerhouse actress and a Hollywood trailblazer.",
    funFact:
      "Once had a pet owl that she would feed frozen mice in her living room.",
    quirk: "Carries hot sauce in her bag and swears by it for all her meals.",
  },
  {
    id: 20,
    name: "Penélope Cruz",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 93,
    image: "/Penélope-Cruz.jpg",
    bio: "Spain's most glamorous export with a talent that transcends borders.",
    funFact:
      "Started as a dancer and was once Madonna’s backup dancer for a concert.",
    quirk:
      "Is a huge karaoke fan and loves singing 80s pop songs with friends.",
  },
  {
    id: 21,
    name: "Jennifer Aniston",
    age: 52,
    maritalStatus: "Divorced",
    hotnessScore: 91,
    image: "/Jennifer-Aniston.jpg",
    bio: "America’s sweetheart from Friends, her charm hasn’t aged a day since the ‘90s.",
    funFact:
      "Has a secret talent for doing celebrity impressions, especially Barbra Streisand.",
    quirk:
      "Refuses to watch any episode of Friends, even though she still knows all the lines.",
  },
  {
    id: 22,
    name: "Reese Witherspoon",
    age: 45,
    maritalStatus: "Married",
    hotnessScore: 89,
    image: "/Reese-Witherspoon.jpg",
    bio: "From Elle Woods to Big Little Lies, she’s proof that brains and beauty can coexist.",
    funFact:
      "Owns her own production company and has produced multiple award-winning films.",
    quirk:
      "Has an extensive collection of vintage typewriters that she’s always adding to.",
  },
  {
    id: 23,
    name: "Brie Larson",
    age: 31,
    maritalStatus: "Single",
    hotnessScore: 95,
    image: "/Brie-Larson.jpg",
    bio: "Captain Marvel on screen and off, she’s a superhero both in film and activism.",
    funFact:
      "Plays the guitar and even wrote her own songs for a short-lived pop career as a teen.",
    quirk:
      "Keeps a journal of dreams and tries to interpret them every morning.",
  },
  {
    id: 24,
    name: "Lupita Nyong’o",
    age: 38,
    maritalStatus: "Single",
    hotnessScore: 93,
    image: "/Lupita-Nyong.jpg",
    bio: "Oscar-winning actress and fashion icon who breaks barriers and inspires everywhere she goes.",
    funFact:
      "Once helped design a lipstick line to empower women of all skin tones.",
    quirk:
      "Has an affinity for photography and often takes candid shots on movie sets.",
  },
  {
    id: 25,
    name: "Elizabeth Olsen",
    age: 32,
    maritalStatus: "Engaged",
    hotnessScore: 94,
    image: "/Elizabeth-Olsen.jpg",
    bio: "The Scarlet Witch with an understated charm. Rising from her famous siblings' shadow into a star of her own.",
    funFact:
      "Has a degree in psychology and almost pursued a career outside of acting.",
    quirk:
      "Loves cooking and often experiments with vegan recipes for her family.",
  },
  {
    id: 26,
    name: "Shailene Woodley",
    age: 29,
    maritalStatus: "Engaged",
    hotnessScore: 91,
    image: "/Shailene-Woodley.jpg",
    bio: "Divergent’s rebellious star and an advocate for environmentalism and organic living.",
    funFact:
      "Makes her own toothpaste and soap, and once lived without a cell phone for years.",
    quirk: "Known to eat clay for its supposed health benefits.",
  },
  {
    id: 27,
    name: "Tessa Thompson",
    age: 37,
    maritalStatus: "Single",
    hotnessScore: 92,
    image: "/Tessa-Thompson.jpg",
    bio: "Whether it's on Asgard or Earth, this versatile star always brings an element of cool.",
    funFact:
      "Can sing and has performed on several soundtracks for her movies.",
    quirk: "Once kept a 'character mood' playlist for each role she played.",
  },
  {
    id: 28,
    name: "Rachel McAdams",
    age: 42,
    maritalStatus: "Married",
    hotnessScore: 91,
    image: "/Rachel-McAdams.jpg",
    bio: "The Notebook’s queen of romance, she’s as grounded as her characters are charming.",
    funFact:
      "Worked at McDonald's for three years before her acting career took off.",
    quirk:
      "Prefers to ride her bike to set and around town instead of using a car.",
  },
  {
    id: 29,
    name: "Amy Adams",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 90,
    image: "/Amy-Adams.jpg",
    bio: "From enchanted princess to hard-hitting journalist, her range knows no bounds.",
    funFact:
      "Was once a competitive dancer and almost pursued ballet as a career.",
    quirk:
      "Has a habit of doodling on scripts between takes to calm her nerves.",
  },
  {
    id: 30,
    name: "Viola Davis",
    age: 56,
    maritalStatus: "Married",
    hotnessScore: 88,
    image: "/Viola-Davis.jpg",
    bio: "An Oscar, Emmy, and Tony winner, she’s a legend of the screen with a commanding presence.",
    funFact:
      "Grew up in extreme poverty and now advocates for childhood hunger relief.",
    quirk:
      "Wears brightly colored socks for good luck during every performance.",
  },
  {
    id: 31,
    name: "Eva Green",
    age: 41,
    maritalStatus: "Single",
    hotnessScore: 92,
    image: "/Eva-Green.jpg",
    bio: "The gothic beauty of Penny Dreadful fame, she’s known for her mysterious roles and striking looks.",
    funFact:
      "Collects taxidermy animals as part of her eclectic interior design style.",
    quirk:
      "Is incredibly shy in real life despite playing many bold and intense characters.",
  },
  {
    id: 32,
    name: "Priyanka Chopra",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 96,
    image: "/Priyanka-Chopra.jpg",
    bio: "Bollywood megastar turned Hollywood sensation, her global appeal knows no bounds.",
    funFact:
      "Was once crowned Miss World in 2000 before transitioning into acting.",
    quirk:
      "Loves playing board games with family, especially Scrabble and Monopoly.",
  },
  {
    id: 33,
    name: "Cate Blanchett",
    age: 52,
    maritalStatus: "Married",
    hotnessScore: 89,
    image: "/Cate-Blanchett.jpg",
    bio: "The ethereal queen of both indie films and blockbusters, Cate commands any role she takes on.",
    funFact: "Has an honorary doctorate from the University of Sydney.",
    quirk: "Loves gardening and gets hands-on with her own vegetable patch.",
  },
  {
    id: 34,
    name: "Daisy Ridley",
    age: 29,
    maritalStatus: "Single",
    hotnessScore: 93,
    image: "/Daisy-Ridley.jpg",
    bio: "Star Wars' newest Jedi, bringing strength and grace to the galaxy far, far away.",
    funFact: "Can rap every word to Eminem's 'Lose Yourself' flawlessly.",
    quirk: "Loves practicing calligraphy in her spare time.",
  },
  {
    id: 35,
    name: "Kirsten Dunst",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 88,
    image: "/Kirsten-Dunst.jpg",
    bio: "From child star to indie darling, Kirsten continues to surprise audiences with her range.",
    funFact:
      "Was the first American actress to win the Best Actress Award at Cannes.",
    quirk: "Has a serious obsession with vintage clothing and loves thrifting.",
  },
  {
    id: 36,
    name: "Jodie Comer",
    age: 28,
    maritalStatus: "Single",
    hotnessScore: 94,
    image: "/Jodie-Comer.jpg",
    bio: "Killing Eve’s brilliant assassin, delivering deadly performances with charm.",
    funFact:
      "Can do nearly any accent perfectly, which is why she often surprises fans with her real voice.",
    quirk: "Is addicted to playing The Sims in her downtime.",
  },
  {
    id: 37,
    name: "Alicia Vikander",
    age: 33,
    maritalStatus: "Married",
    hotnessScore: 92,
    image: "/Alicia-Vikander.jpg",
    bio: "An Oscar-winning actress whose captivating presence shines in every role she plays.",
    funFact: "Started as a trained ballet dancer before moving into acting.",
    quirk:
      "Has a secret passion for architecture and often sketches home designs.",
  },
  {
    id: 38,
    name: "Gwyneth Paltrow",
    age: 49,
    maritalStatus: "Married",
    hotnessScore: 87,
    image: "/Gwyneth-Paltrow.jpg",
    bio: "From Oscar-winning actress to wellness mogul, Gwyneth defines reinvention.",
    funFact:
      "Once broke a Guinness World Record for the longest continuous movie kiss in 'A Perfect Murder.'",
    quirk: "Has an unusual obsession with candles and creates custom scents.",
  },
  {
    id: 39,
    name: "Kristen Stewart",
    age: 31,
    maritalStatus: "Engaged",
    hotnessScore: 89,
    image: "/Kristen-Stewart.jpg",
    bio: "The Twilight saga's brooding star, she’s come into her own with indie films and bold choices.",
    funFact:
      "Directed a short film that was featured at the Sundance Film Festival.",
    quirk: "Loves to skateboard and often rides around the set between takes.",
  },
  {
    id: 40,
    name: "Zoe Saldana",
    age: 43,
    maritalStatus: "Married",
    hotnessScore: 91,
    image: "/Zoe-Saldana.jpg",
    bio: "The queen of sci-fi, Zoe rules over both the Marvel and Avatar universes.",
    funFact:
      "Once had to learn how to walk like a Na'vi for months for Avatar.",
    quirk: "Has an impressive collection of vintage comic books.",
  },
  {
    id: 41,
    name: "Sandra Bullock",
    age: 57,
    maritalStatus: "Single",
    hotnessScore: 86,
    image: "/Sandra-Bullock.jpg",
    bio: "America's sweetheart, known for her charm, wit, and thrilling action roles.",
    funFact:
      "Used to own a restaurant in Austin, Texas, serving southern comfort food.",
    quirk: "Obsessed with cleanliness; even cleans hotel rooms herself.",
  },
  {
    id: 42,
    name: "Emily Ratajkowski",
    age: 30,
    maritalStatus: "Single",
    hotnessScore: 95,
    image: "/Emily-Ratajkowski.jpg",
    bio: "Supermodel-turned-actress, known for her boldness and beauty.",
    funFact:
      "Wrote a bestselling book about her experiences in the fashion industry.",
    quirk: "Can memorize lyrics to almost any song after hearing it once.",
  },
  {
    id: 43,
    name: "Michelle Rodriguez",
    age: 43,
    maritalStatus: "Single",
    hotnessScore: 88,
    image: "/Michelle-Rodriguez.jpg",
    bio: "The ultimate action star, Michelle brings toughness and grit to every role.",
    funFact: "Is a certified deep-sea diver and loves exploring ocean life.",
    quirk: "Always travels with her own collection of spicy hot sauces.",
  },
  {
    id: 44,
    name: "Monica Bellucci",
    age: 57,
    maritalStatus: "Divorced",
    hotnessScore: 90,
    image: "/Monica-Bellucci.jpg",
    bio: "An Italian icon, Monica’s elegance and timeless beauty have made her a global sensation.",
    funFact: "Started her career as a model while studying law.",
    quirk:
      "Has a passion for classical opera and often attends live performances.",
  },
  {
    id: 45,
    name: "Rosamund Pike",
    age: 42,
    maritalStatus: "Married",
    hotnessScore: 92,
    image: "/Rosamund-Pike.jpg",
    bio: "From playing Bond girls to calculating masterminds, Rosamund’s range is limitless.",
    funFact: "Fluent in German and once lived in Germany for a year.",
    quirk: "Enjoys knitting intricate sweaters in her downtime.",
  },
  {
    id: 46,
    name: "Thandiwe Newton",
    age: 48,
    maritalStatus: "Married",
    hotnessScore: 89,
    image: "/Thandiwe-Newton.jpg",
    bio: "A powerhouse actress known for bringing depth to every role, from drama to sci-fi.",
    funFact:
      "Won an Emmy for her role in *Westworld*, after performing in 34 films.",
    quirk: "Has a habit of collecting antique typewriters.",
  },
  {
    id: 47,
    name: "Helena Bonham Carter",
    age: 55,
    maritalStatus: "Single",
    hotnessScore: 85,
    image: "/Helena-Bonham-Carter.jpg",
    bio: "The queen of quirky and eccentric roles, Helena makes being different truly cool.",
    funFact:
      "Owns one of the largest personal collections of vintage hats in the UK.",
    quirk: "Obsessed with tea, drinks over 10 cups a day.",
  },
  {
    id: 48,
    name: "Jessica Alba",
    age: 40,
    maritalStatus: "Married",
    hotnessScore: 92,
    image: "/Jessica-Alba.jpg",
    bio: "From superhero to entrepreneur, Jessica juggles fame and business with ease.",
    funFact:
      "Founder of The Honest Company, a billion-dollar clean products brand.",
    quirk: "Carries a mini humidifier everywhere she goes.",
  },
  {
    id: 49,
    name: "Eva Mendes",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 91,
    image: "/Eva-Mendes.jpg",
    bio: "A Hollywood favorite with a charming smile and effortless grace.",
    funFact: "Turned down the role of Wonder Woman in 2005.",
    quirk: "Loves DIY projects, especially crafting unique home decor.",
  },
  {
    id: 50,
    name: "Nicole Kidman",
    age: 54,
    maritalStatus: "Married",
    hotnessScore: 88,
    image: "/Nicole-Kidman.jpg",
    bio: "An acting legend, Nicole has graced both Hollywood blockbusters and indie films alike.",
    funFact: "Plays the didgeridoo, an Aboriginal Australian instrument.",
    quirk:
      "Carries a small jar of Vegemite in her purse, a nod to her Aussie roots.",
  },
  {
    id: 51,
    name: "Sydney Sweeney",
    age: 27,
    maritalStatus: "Single",
    hotnessScore: 100,
    image: "/Sydney-Sweeney.jpg",
    bio: "A breakout star with a fierce presence, lighting up both TV and film screens.",
    funFact:
      "Is an MMA fighter in her spare time and has trained since high school.",
    quirk:
      "Has an impressive collection of vintage cars, which she loves restoring herself.",
  },
];

export function ActressTinderComponent() {
  const [actresses, setActresses] = useState(initialActresses);
  const [currentIndex, setCurrentIndex] = useState(actresses.length - 1);
  const [points, setPoints] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [leaderboard, setLeaderboard] = useState(initialActresses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwipingOver, setIsSwipingOver] = useState(false);
  const [movieData, setMovieData] = useState([
    {
      id: 1,
      title: "La La Land",
      description:
        "A jazz pianist falls for an aspiring actress in Los Angeles.",
      poster: "/placeholder.svg?height=300&width=200",
      actress: "Emma Stone",
    },
    {
      id: 2,
      title: "Black Widow",
      description:
        "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
      poster: "/placeholder.svg?height=300&width=200",
      actress: "Scarlett Johansson",
    },
    {
      id: 3,
      title: "Silver Linings Playbook",
      description:
        "After a stint in a mental institution, former teacher Pat Solitano moves back in with his parents and tries to reconcile with his ex-wife.",
      poster: "/placeholder.svg?height=300&width=200",
      actress: "Jennifer Lawrence",
    },
    {
      id: 4,
      title: "I, Tonya",
      description:
        "Competitive ice skater Tonya Harding rises amongst the ranks at the U.S. Figure Skating Championships, but her future in the activity is thrown into doubt when her ex-husband intervenes.",
      poster: "/placeholder.svg?height=300&width=200",
      actress: "Margot Robbie",
    },
    {
      id: 5,
      title: "Wonder Woman",
      description:
        "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
      poster: "/placeholder.svg?height=300&width=200",
      actress: "Gal Gadot",
    },
  ]);
  const childRefs = React.useMemo(
    () =>
      Array(actresses.length)
        .fill(0)
        .map(() => React.createRef()),
    [actresses.length]
  );

  useEffect(() => {
    if (currentIndex < 0) {
      setIsSwipingOver(true);
    }
  }, [currentIndex]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, idToDelete, index) => {
    updateCurrentIndex(index - 1);
    const pointDelta = direction === "right" ? 5 : -5;
    setPoints((prevPoints) => prevPoints + pointDelta);
    setSwipeDirection(direction);
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1500);

    setLeaderboard((prevLeaderboard) => {
      const updatedLeaderboard = prevLeaderboard.map((actress) => {
        if (actress.id === idToDelete) {
          return {
            ...actress,
            hotnessScore: actress.hotnessScore + pointDelta,
          };
        }
        return actress;
      });
      return updatedLeaderboard.sort((a, b) => b.hotnessScore - a.hotnessScore);
    });

    setActresses((prevActresses) =>
      prevActresses.filter((actress) => actress.id !== idToDelete)
    );
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndex);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < actresses.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const filteredLeaderboard = leaderboard.filter((actress) =>
    actress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top5Actresses = leaderboard.slice(0, 5);
  const top5Movies = movieData.filter((movie) =>
    top5Actresses.some((actress) => actress.name === movie.actress)
  );

  useEffect(() => {
    console.log("i am isSwipingOver", isSwipingOver);
    if (isSwipingOver) {
      fetchMovieData();
    }
  }, [isSwipingOver]);

  const fetchMovieData = async () => {
    const topActresses = leaderboard.slice(0, 5).map((actress) => actress.name);
    console.log("i am topActresses", topActresses);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGIxM2VmNWU2ZTMyMzE4M2MwN2QzOGFjYzAwZmI2YiIsIm5iZiI6MTcyNzMzMzYwNC4xNTYyOSwic3ViIjoiNjZmNTAzOTczODk0MmFiODkwZWQzYjhmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fqLQUKStBCdnAgBrQ90S3TNPXUdDjTQNmgrND5xdpa8",
      },
    };
    const moviePromises = topActresses.map(async (actress) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
          actress
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      return data; // Assume the returned data contains movie details
    });

    const movieResults = await Promise.all(moviePromises);
    console.log(movieResults);
    let parsedData = [];
    movieResults.map((movie) => {
      movie.results.map((items) => {
        items.known_for.map((list) => {
          parsedData.push({
            id: items.id,
            poster: "http://image.tmdb.org/t/p/original" + list.poster_path,
            title:
              list.original_name ||
              list.name ||
              list.original_title ||
              list.title,
            description: list.overview,
            actress: items.original_name,
          });
        });
      });
    });
    console.log(parsedData);
    setMovieData(parsedData);
  };
  // - when swipe is over, make api call - swipe is tracked by isSwipeOver state variable
  // - pass top 5 actress names from state variable leaderboard in query on by one
  // Parse the returned to data to only contain movie_name, poster, starring, description
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <h1 className="text-2xl font-bold mb-8 text-white">ActorSwipe</h1>
      <div className="absolute top-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trophy className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[425px] h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Actress Leaderboard</DialogTitle>
            </DialogHeader>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search actresses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="flex-grow">
              <div className="space-y-4">
                {filteredLeaderboard.map((actress, index) => {
                  const prevRank = leaderboard.findIndex(
                    (a) => a.id === actress.id
                  );
                  const rankChange = prevRank - index;
                  return (
                    <div
                      key={actress.id}
                      className="flex items-center space-x-4"
                    >
                      <span className="text-lg font-semibold">{index + 1}</span>
                      <Avatar className="w-10 h-10">
                        <img
                          src={actress.image}
                          alt={actress.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-medium">{actress.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Popularity: {actress.hotnessScore}
                        </p>
                      </div>
                      {rankChange !== 0 && (
                        <div className="flex items-center">
                          {rankChange > 0 ? (
                            <ArrowUp className="text-green-500" />
                          ) : (
                            <ArrowDown className="text-red-500" />
                          )}
                          <span
                            className={`text-sm ${
                              rankChange > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {Math.abs(rankChange)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      {!isSwipingOver ? (
        <>
          <div className="relative w-full max-w-sm h-[450px] sm:h-[600px]">
            {actresses.map((actress, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="absolute"
                key={actress.id}
                onSwipe={(dir) => swiped(dir, actress.id, index)}
                onCardLeftScreen={() => outOfFrame(actress.name, index)}
              >
                <Card className="w-full h-full flex flex-col justify-between p-4 cursor-grab active:cursor-grabbing">
                  <CardContent className="flex flex-col items-center p-0">
                    <Avatar className="w-32 h-32 sm:w-48 sm:h-48 mb-4">
                      <img
                        src={actress.image}
                        alt={actress.name}
                        className="object-cover"
                      />
                    </Avatar>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                      {actress.name}
                    </h2>
                    <p className="text-base sm:text-lg mb-1">
                      Age: {actress.age}
                    </p>
                    <p className="text-base sm:text-lg mb-1">
                      Status: {actress.maritalStatus}
                    </p>
                    <Badge variant="secondary" className="mb-2">
                      Popularity: {actress.hotnessScore}
                    </Badge>
                    <p className="text-xs sm:text-sm text-center mb-2">
                      {actress.bio}
                    </p>
                    <p className="text-xs sm:text-sm text-center mb-2">
                      <span className="font-semibold">Fun Fact:</span>{" "}
                      {actress.funFact}
                    </p>
                    <p className="text-xs sm:text-sm text-center">
                      <span className="font-semibold">Quirk:</span>{" "}
                      {actress.quirk}
                    </p>
                  </CardContent>
                </Card>
              </TinderCard>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => swipe("left")}
              disabled={!canSwipe}
            >
              <X className="mr-2 h-4 w-4" /> Nope
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => swipe("right")}
              disabled={!canSwipe}
            >
              <Heart className="mr-2 h-4 w-4" /> Like
            </Button>
          </div>
          <p className="mt-4 text-xl font-semibold text-white">
            Total Points: {points}
          </p>
          <AnimatePresence>
            {showEmoji && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-20 text-4xl"
              >
                {swipeDirection === "right" ? "😍" : "😢"}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Top Recommendation based on Swipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movieData.map((movie) => (
              <Card key={movie.id} className="flex flex-col h-full">
                <CardContent className="p-4 flex-grow">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 sm:h-64 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    Starring: {movie.actress}
                  </p>
                  <p className="text-xs sm:text-sm">{movie.description}</p>
                </CardContent>
                <CardFooter className="p-4">
                  <Link href="https://www.netflix.com">
                    <Button className="w-full">Watch Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
