import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ApiService } from "@/api";

type User = {
	id: number;
	email: string;
	isActive: boolean;
	role: string;
	createdAt: Date;
};

interface UserContextProps {
	user: {};
	setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
	undefined,
);

const apiService = new ApiService();

export const UserProvider: React.FC<{ email: string; children: ReactNode }> = ({
	children,
	email,
}) => {
	const [user, setUser] = useState<User>({
		id: 0,
		email: "",
		isActive: false,
		role: "",
		createdAt: new Date(),
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await apiService.getUserByEmail(email);
				setUser(user);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
