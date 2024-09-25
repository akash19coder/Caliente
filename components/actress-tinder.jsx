"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TinderCard from "react-tinder-card";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy actress data
const initialActresses = [
  {
    id: 1,
    name: "Emma Stone",
    age: 32,
    maritalStatus: "Married",
    hotnessScore: 95,
    nationality: "American",
    image: "/emma-stone.jpg",
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    age: 36,
    maritalStatus: "Divorced",
    hotnessScore: 97,
    nationality: "American",
    image: "/scarlett-johansson.jpg",
  },
  {
    id: 3,
    name: "Jennifer Lawrence",
    age: 30,
    maritalStatus: "Single",
    hotnessScore: 94,
    nationality: "American",
    image: "/Jennifer-Lawrence.jpg",
  },
  {
    id: 4,
    name: "Margot Robbie",
    age: 31,
    maritalStatus: "Married",
    hotnessScore: 96,
    nationality: "Australian",
    image: "/Margot-Robbie.jpg",
  },
  {
    id: 5,
    name: "Gal Gadot",
    age: 36,
    maritalStatus: "Married",
    hotnessScore: 98,
    nationality: "Israeli",
    image: "/Gal-Gadot.jpg",
  },
  {
    id: 6,
    name: "Natalie Portman",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 95,
    nationality: "Israeli-American",
    image: "/Natalie-Portman.jpg",
  },
  {
    id: 7,
    name: "Charlize Theron",
    age: 45,
    maritalStatus: "Single",
    hotnessScore: 94,
    nationality: "South African-American",
    image: "/Charlize-Theron.jpg",
  },
  {
    id: 8,
    name: "Anne Hathaway",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 92,
    nationality: "American",
    image: "/Anne-Hathaway.jpg",
  },
  {
    id: 9,
    name: "Angelina Jolie",
    age: 46,
    maritalStatus: "Divorced",
    hotnessScore: 90,
    nationality: "American",
    image: "Angelina-Jolie.jpg",
  },
  {
    id: 10,
    name: "Keira Knightley",
    age: 36,
    maritalStatus: "Married",
    hotnessScore: 91,
    nationality: "British",
    image: "/Keira-Knightley.jpg",
  },
  {
    id: 11,
    name: "Emily Blunt",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 93,
    nationality: "British",
    image: "/Emily-Blunt.jpg",
  },
  {
    id: 12,
    name: "Emma Watson",
    age: 31,
    maritalStatus: "Single",
    hotnessScore: 95,
    nationality: "British",
    image: "/Emma-Watson.jpg",
  },
  {
    id: 13,
    name: "Zendaya",
    age: 25,
    maritalStatus: "Single",
    hotnessScore: 97,
    nationality: "American",
    image: "/Zendaya.jpg",
  },
  {
    id: 14,
    name: "Jessica Chastain",
    age: 44,
    maritalStatus: "Married",
    hotnessScore: 90,
    nationality: "American",
    image: "/Jessica-Chastain.jpg",
  },
  {
    id: 15,
    name: "Mila Kunis",
    age: 38,
    maritalStatus: "Married",
    hotnessScore: 93,
    nationality: "American",
    image: "/Mila-Kunis.jpg",
  },
  {
    id: 16,
    name: "Kate Winslet",
    age: 45,
    maritalStatus: "Married",
    hotnessScore: 92,
    nationality: "British",
    image: "/Kate-Winslet.jpg",
  },
  {
    id: 17,
    name: "Saoirse Ronan",
    age: 27,
    maritalStatus: "Single",
    hotnessScore: 89,
    nationality: "Irish",
    image: "/Saoirse-Ronan.jpg",
  },
  {
    id: 18,
    name: "Blake Lively",
    age: 34,
    maritalStatus: "Married",
    hotnessScore: 94,
    nationality: "American",
    image: "/Blake-Lively.jpg",
  },
  {
    id: 19,
    name: "Salma Hayek",
    age: 55,
    maritalStatus: "Married",
    hotnessScore: 90,
    nationality: "Mexican-American",
    image: "/Salma-Hayek.jpg",
  },
  {
    id: 20,
    name: "Penélope Cruz",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 93,
    nationality: "Spanish",
    image: "/Penélope-Cruz.jpg",
  },
  {
    id: 21,
    name: "Jennifer Aniston",
    age: 52,
    maritalStatus: "Divorced",
    hotnessScore: 91,
    nationality: "American",
    image: "/Jennifer-Aniston.jpg",
  },
  {
    id: 22,
    name: "Reese Witherspoon",
    age: 45,
    maritalStatus: "Married",
    hotnessScore: 89,
    nationality: "American",
    image: "/Reese-Witherspoon.jpg",
  },
  {
    id: 23,
    name: "Brie Larson",
    age: 31,
    maritalStatus: "Single",
    hotnessScore: 95,
    nationality: "American",
    image: "/Brie-Larson.jpg",
  },
  {
    id: 24,
    name: "Lupita Nyong",
    age: 38,
    maritalStatus: "Single",
    hotnessScore: 93,
    nationality: "Kenyan-Mexican",
    image: "/Lupita-Nyong.jpg",
  },
  {
    id: 25,
    name: "Elizabeth Olsen",
    age: 32,
    maritalStatus: "Engaged",
    hotnessScore: 94,
    nationality: "American",
    image: "/Elizabeth-Olsen.jpg",
  },
  {
    id: 26,
    name: "Shailene Woodley",
    age: 29,
    maritalStatus: "Engaged",
    hotnessScore: 91,
    nationality: "American",
    image: "/Shailene-Woodley.jpg",
  },
  {
    id: 27,
    name: "Tessa Thompson",
    age: 37,
    maritalStatus: "Single",
    hotnessScore: 92,
    nationality: "American",
    image: "/Tessa-Thompson.jpg",
  },
  {
    id: 28,
    name: "Rachel McAdams",
    age: 42,
    maritalStatus: "Married",
    hotnessScore: 91,
    nationality: "Canadian",
    image: "/Rachel-McAdams.jpg",
  },
  {
    id: 29,
    name: "Amy Adams",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 90,
    nationality: "American",
    image: "/Amy-Adams.jpg",
  },
  {
    id: 30,
    name: "Viola Davis",
    age: 56,
    maritalStatus: "Married",
    hotnessScore: 88,
    nationality: "American",
    image: "/Viola-Davis.jpg",
  },
  {
    id: 31,
    name: "Eva Green",
    age: 41,
    maritalStatus: "Single",
    hotnessScore: 92,
    nationality: "French",
    image: "/Eva-Green.jpg",
  },
  {
    id: 32,
    name: "Priyanka Chopra",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 96,
    nationality: "Indian",
    image: "/Priyanka-Chopra.jpg",
  },
  {
    id: 33,
    name: "Cate Blanchett",
    age: 52,
    maritalStatus: "Married",
    hotnessScore: 89,
    nationality: "Australian",
    image: "/Cate-Blanchett.jpg",
  },
  {
    id: 34,
    name: "Daisy Ridley",
    age: 29,
    maritalStatus: "Single",
    hotnessScore: 93,
    nationality: "British",
    image: "/Daisy-Ridley.jpg",
  },
  {
    id: 35,
    name: "Kirsten Dunst",
    age: 39,
    maritalStatus: "Married",
    hotnessScore: 88,
    nationality: "American",
    image: "/Kirsten-Dunst.jpg",
  },
  {
    id: 36,
    name: "Jodie Comer",
    age: 28,
    maritalStatus: "Single",
    hotnessScore: 94,
    nationality: "British",
    image: "/Jodie-Comer.jpg",
  },
  {
    id: 37,
    name: "Alicia Vikander",
    age: 33,
    maritalStatus: "Married",
    hotnessScore: 92,
    nationality: "Swedish",
    image: "/Alicia-Vikander.jpg",
  },
  {
    id: 38,
    name: "Gwyneth Paltrow",
    age: 49,
    maritalStatus: "Married",
    hotnessScore: 87,
    nationality: "American",
    image: "/Gwyneth-Paltrow.jpg",
  },
  {
    id: 39,
    name: "Kristen Stewart",
    age: 31,
    maritalStatus: "Engaged",
    hotnessScore: 89,
    nationality: "American",
    image: "/Kristen-Stewart.jpg",
  },
  {
    id: 40,
    name: "Zoe Saldana",
    age: 43,
    maritalStatus: "Married",
    hotnessScore: 91,
    nationality: "American",
    image: "/Zoe-Saldana.jpg",
  },
  {
    id: 41,
    name: "Sandra Bullock",
    age: 57,
    maritalStatus: "Single",
    hotnessScore: 86,
    nationality: "American",
    image: "/Sandra-Bullock.jpg",
  },
  {
    id: 42,
    name: "Emily Ratajkowski",
    age: 30,
    maritalStatus: "Single",
    hotnessScore: 95,
    nationality: "American",
    image: "/Emily-Ratajkowski.jpg",
  },
  {
    id: 43,
    name: "Michelle Rodriguez",
    age: 43,
    maritalStatus: "Single",
    hotnessScore: 88,
    nationality: "American",
    image: "/Michelle-Rodriguez.jpg",
  },
  {
    id: 44,
    name: "Monica Bellucci",
    age: 57,
    maritalStatus: "Divorced",
    hotnessScore: 90,
    nationality: "Italian",
    image: "/Monica-Bellucci.jpg",
  },
  {
    id: 45,
    name: "Rosamund Pike",
    age: 42,
    maritalStatus: "Married",
    hotnessScore: 92,
    nationality: "British",
    image: "/Rosamund-Pike.jpg",
  },
  {
    id: 46,
    name: "Thandiwe Newton",
    age: 48,
    maritalStatus: "Married",
    hotnessScore: 89,
    nationality: "British",
    image: "/Thandiwe-Newton.jpg",
  },
  {
    id: 47,
    name: "Helena Bonham Carter",
    age: 55,
    maritalStatus: "Single",
    hotnessScore: 85,
    nationality: "British",
    image: "/Helena-Bonham-Carter.jpg",
  },
  {
    id: 48,
    name: "Jessica Alba",
    age: 40,
    maritalStatus: "Married",
    hotnessScore: 92,
    nationality: "American",
    image: "/Jessica-Alba.jpg",
  },
  {
    id: 49,
    name: "Eva Mendes",
    age: 47,
    maritalStatus: "Married",
    hotnessScore: 91,
    nationality: "American",
    image: "/Eva-Mendes.jpg",
  },
  {
    id: 50,
    name: "Nicole Kidman",
    age: 54,
    maritalStatus: "Married",
    hotnessScore: 88,
    nationality: "Australian",
    image: "/Nicole-Kidman.jpg",
  },
  {
    id: 51,
    name: "Sydney Sweeney",
    age: 27,
    maritalStatus: "Single",
    hotnessScore: 100,
    nationality: "American",
    image: "/Sydney-Sweeney.jpg",
  },
];

export function ActressTinderComponent() {
  const [actresses, setActresses] = useState(initialActresses);
  const [currentIndex, setCurrentIndex] = useState(actresses.length - 1);
  const [lastDirection, setLastDirection] = useState(null);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [pointChange, setPointChange] = useState(0);
  const [leaderboard, setLeaderboard] = useState(initialActresses);
  const [searchTerm, setSearchTerm] = useState("");

  const childRefs = React.useMemo(
    () =>
      Array(actresses.length)
        .fill(0)
        .map(() => React.createRef()),
    [actresses.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, idToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    const pointDelta = direction === "right" ? 5 : -5;
    setPoints((prevPoints) => prevPoints + pointDelta);
    setPointChange(pointDelta);
    setShowPoints(true);
    setTimeout(() => setShowPoints(false), 1500);

    // Update leaderboard
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

    // Remove swiped actress from the deck
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <h1 className="text-4xl font-bold mb-8 text-white">Hot or Not?</h1>
      <div className="absolute top-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Leaderboard</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actress Leaderboard</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search actresses"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px] mt-4">
              <div className="mt-4 space-y-4">
                {filteredLeaderboard.map((actress, index) => (
                  <div key={actress.id} className="flex items-center space-x-4">
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
                        Hotness: {actress.hotnessScore}
                      </p>
                    </div>
                    {index > 0 &&
                    actress.hotnessScore >
                      filteredLeaderboard[index - 1].hotnessScore ? (
                      <ChevronUp className="text-green-500" />
                    ) : index > 0 &&
                      actress.hotnessScore <
                        filteredLeaderboard[index - 1].hotnessScore ? (
                      <ChevronDown className="text-red-500" />
                    ) : null}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative w-80 h-[450px]">
        {actresses.map((actress, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute"
            key={actress.id}
            onSwipe={(dir) => swiped(dir, actress.id, index)}
            onCardLeftScreen={() => outOfFrame(actress.name, index)}
          >
            <Card className="w-80 h-[450px] flex flex-col justify-between p-4 cursor-grab active:cursor-grabbing">
              <CardContent className="flex flex-col items-center p-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="w-48 h-48 mb-4 cursor-pointer">
                      <img
                        src={actress.image}
                        alt={actress.name}
                        className="object-cover"
                      />
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <img
                      src={actress.image}
                      alt={actress.name}
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
                <h2 className="text-2xl font-semibold mb-2">{actress.name}</h2>
                <p className="text-lg mb-1">Age: {actress.age}</p>
                <p className="text-lg mb-1">Status: {actress.maritalStatus}</p>
                <p className="text-lg mb-1">
                  Nationality: {actress.nationality}
                </p>
                <Badge variant="secondary" className="mb-2">
                  Hotness: {actress.hotnessScore}
                </Badge>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          variant="destructive"
          onClick={() => swipe("left")}
          disabled={!canSwipe}
        >
          Swipe Left
        </Button>
        <Button
          variant="default"
          onClick={() => swipe("right")}
          disabled={!canSwipe}
        >
          Swipe Right
        </Button>
      </div>
      <p className="mt-4 text-xl font-semibold text-white">
        Total Points: {points}
      </p>
      <AnimatePresence>
        {showPoints && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`absolute top-20 text-2xl font-bold ${
              pointChange > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {pointChange > 0 ? "+" : ""}
            {pointChange}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
