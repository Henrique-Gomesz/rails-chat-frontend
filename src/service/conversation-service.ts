import { URL } from "../constants";

export async function getAllUsernames(): Promise<string[]> {
    const response = await fetch(`${URL}/user/list`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch usernames");
    }

    const data = await response.json();

    return data.usernames;
}

export async function createConversation(usernames:string[],conversationName:string){
    const response = await fetch(`${URL}/conversation/create`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({participants:usernames,conversation_name:conversationName})
    });

    if (!response.ok) {
        throw new Error("Failed to create conversation");
    }

    const data = await response.json();

    return data.conversationId;
}