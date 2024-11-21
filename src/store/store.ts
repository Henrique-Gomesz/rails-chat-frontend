import { atom } from "jotai";
import { Conversation } from "../types/conversation";

export const conversationsAtom = atom<Conversation[]>([]);
