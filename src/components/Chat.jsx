import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import {
  Sun,
  Moon,
  Star,
  Settings,
  Search,
  ArrowUp,
  Paperclip,
  Brain,
  Code,
  Book,
} from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [starred, setStarred] = useState(false);
  const [activeChat, setActiveChat] = useState("New Chat");
  const [searchTerm, setSearchTerm] = useState("");
  const scrollAreaRef = useRef(null);

  const dummyResponses = [
    "Hello! How can I assist you today?",
    "That's an interesting question. Let me think about it for a moment.",
    "Here's a markdown example:\n\n# Title\n## Subtitle\n- List item 1\n- List item 2\n\n```js\nconsole.log('Hello, world!');\n```",
    "I'm sorry, I don't have enough information to answer that question. Could you please provide more details?",
    "That's a great point! I hadn't considered that perspective before.",
  ];

  const previousChats = [
    "AI Ethics Discussion",
    "Python Programming Help",
    "Book Recommendations",
    "Travel Planning",
    "Fitness Tips",
  ];

  const exampleQuestions = [
    { icon: Brain, text: "What are the latest advancements in AI?" },
    { icon: Code, text: "How can I improve my coding skills?" },
    { icon: Book, text: "What are some must-read books in 2024?" },
  ];

  const filteredChats = previousChats.filter((chat) =>
    chat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const simulateTyping = (text) => {
    setIsTyping(true);
    let i = 0;
    const intervalId = setInterval(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          content: prev[prev.length - 1].content + text[i],
        },
      ]);
      i++;
      if (i === text.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      const response =
        dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
      setMessages((prev) => [...prev, { type: "system", content: "" }]);
      simulateTyping(response);
    }, 1000);
  };

  const handleExampleClick = (question) => {
    setMessages((prev) => [...prev, { type: "user", content: question }]);
    setInput("");

    setTimeout(() => {
      const response =
        dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
      setMessages((prev) => [...prev, { type: "system", content: "" }]);
      simulateTyping(response);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Card
        className={`w-64 p-4 m-2 flex flex-col ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`mb-2 ${
              darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"
            }`}
          />
        </div>
        <ScrollArea className="flex-grow">
          {filteredChats.map((chat, index) => (
            <div
              key={index}
              className={`cursor-pointer p-2 mb-2 rounded ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              } ${
                activeChat === chat
                  ? darkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                  : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat}
            </div>
          ))}
        </ScrollArea>
        <Button
          variant={darkMode ? "outline" : "ghost"}
          className={`w-full mt-4 ${
            darkMode
              ? "text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-gray-100"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Settings className="mr-2" /> Settings
        </Button>
      </Card>

      <div className="flex-1 flex flex-col m-2">
        <Card
          className={`mb-4 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">{activeChat}</h1>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStarred(!starred)}
                className={darkMode ? "text-gray-100 hover:bg-gray-700" : ""}
              >
                <Star className={starred ? "text-yellow-400" : ""} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className={darkMode ? "text-gray-100 hover:bg-gray-700" : ""}
              >
                {darkMode ? <Sun /> : <Moon />}
              </Button>
            </div>
          </div>
        </Card>

        <Card
          className={`flex-grow mb-4 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          } overflow-hidden`}
        >
          <ScrollArea className="h-[calc(100vh-250px)]" ref={scrollAreaRef}>
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {exampleQuestions.map(({ icon: Icon, text }, index) => (
                    <Card
                      key={index}
                      className={`
                        w-48 h-48 p-4 cursor-pointer flex flex-col items-center justify-center text-center
                        ${
                          darkMode
                            ? "bg-gray-700 bg-opacity-50 hover:bg-gray-600 text-gray-100"
                            : "bg-white bg-opacity-50 hover:bg-gray-100 text-gray-900"
                        }
                        backdrop-filter backdrop-blur-lg
                        border border-opacity-20
                        transition-all duration-300 ease-in-out
                        shadow-lg rounded-xl
                        transform hover:scale-105 hover:shadow-xl
                      `}
                      onClick={() => handleExampleClick(text)}
                    >
                      <Icon
                        size={32}
                        className={`mb-4 ${
                          darkMode ? "text-blue-300" : "text-blue-500"
                        } transition-colors duration-300 group-hover:text-blue-600`}
                      />
                      <p className="text-sm group-hover:text-blue-500 transition-colors duration-300">
                        {text}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.type === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <Card
                      className={`inline-block p-2 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : darkMode
                          ? "bg-gray-700 text-gray-100"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            {isTyping && (
              <div
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } p-4`}
              >
                System is typing...
              </div>
            )}
          </ScrollArea>
        </Card>

        <Card
          className={`p-4 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-grow ${
                darkMode
                  ? "bg-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-white text-gray-900"
              }`}
            />
            <Button
              type="submit"
              size="icon"
              className={
                darkMode ? "bg-blue-600 hover:bg-blue-700 text-gray-100" : ""
              }
            >
              <ArrowUp />
            </Button>
            <Button
              type="button"
              size="icon"
              variant={darkMode ? "outline" : "outline"}
              className={
                darkMode
                  ? "text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-gray-100"
                  : "text-gray-700 hover:bg-gray-200"
              }
            >
              <Paperclip />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
