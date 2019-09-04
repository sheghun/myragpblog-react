export function setUsername(username: string) {
	localStorage.setItem("username", username);
}

export const username = localStorage.getItem("username") as string;

// export const baseUrl = "https://api.myragpblog.com/";
export const baseUrl = "http://localhost:8000/";
