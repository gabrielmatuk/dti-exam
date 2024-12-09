import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";

const userData = {
	id: 1,
	name: "Gabriel",
	email: "test@test.com",
	password: "******",
	avatarUrl: "",
};

type UserType = {
	id: number;
	name: string;
	email: string;
	password: string;
	avatarUrl: string;
};

export default function UserPage() {
	const [user, setUser] = useState<UserType | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [newAvatar, setNewAvatar] = useState<File | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		setUser(userData);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (user) {
			const { name, value } = e.target;
			setUser({ ...user, [name]: value });
		}
	};

	const handleSave = () => {
		toast({
			title: "Usuário atualizado",
			description: "As informações do usuário foram atualizadas com sucesso",
			variant: "default",
		});
		console.log("Informações atualizadas: ", user);
	};

	const handleAvatarClick = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setNewAvatar(file);
		}
	};

	const handleUpload = () => {
		if (newAvatar && user) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const imageUrl = reader.result as string;
				setUser({ ...user, avatarUrl: imageUrl });
			};
			reader.readAsDataURL(newAvatar);
			setNewAvatar(null);
			setShowModal(false);
		}
	};

	if (!user) {
		return <div>Carregando...</div>;
	}

	return (
		<div
			style={{
				padding: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Card style={{ width: "400px", textAlign: "center" }}>
				<CardHeader>
					<div
						style={{
							position: "relative",
							width: "100px",
							height: "100px",
							margin: "0 auto",
							cursor: "pointer",
						}}
						onClick={handleAvatarClick}
					>
						<Avatar
							style={{
								width: "100%",
								height: "100%",
								opacity: "1",
								transition: "opacity 0.3s",
							}}
						>
							<AvatarImage
								src={user.avatarUrl || ""}
								alt={user.name}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<AvatarFallback>{user.name[0]}</AvatarFallback>
						</Avatar>
						<div
							className="hover-overlay"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								opacity: 0,
								transition: "opacity 0.3s",
							}}
						>
							<Edit3 color="white" size={32} />
						</div>
					</div>
					<CardTitle>{user.name}</CardTitle>
					<CardDescription>{<p>ID do usuário: {user.id}</p>}</CardDescription>
				</CardHeader>
				<CardContent>
					<div style={{ marginBottom: "10px" }}>
						<label>Nome:</label>
						<Input name="name" value={user.name} onChange={handleChange} />
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Email:</label>
						<Input name="email" value={user.email} onChange={handleChange} />
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label>Senha:</label>
						<Input
							name="password"
							type="password"
							value={user.password}
							onChange={handleChange}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleSave}>Salvar</Button>
				</CardFooter>
			</Card>

			{showModal && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						style={{
							backgroundColor: "white",
							padding: "20px",
							borderRadius: "8px",
							boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
							textAlign: "center",
						}}
					>
						<h2>Selecione uma nova imagem</h2>
						<input type="file" accept="image/*" onChange={handleFileChange} />
						<div style={{ marginTop: "20px" }}>
							<Button onClick={handleUpload}>Upload</Button>
							<Button onClick={handleModalClose} style={{ marginLeft: "10px" }}>
								Cancelar
							</Button>
						</div>
					</div>
				</div>
			)}

			<style>{`
        div:hover .hover-overlay {
          opacity: 1;
        }

        div:hover .avatar-image {
          opacity: 0.4;
        }
      `}</style>
		</div>
	);
}
