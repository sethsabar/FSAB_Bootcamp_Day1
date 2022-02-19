import type {NextPage} from 'next'
import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import Post from "../components/Post";
import NewPostModal from "../components/NewPostModal";
import {useState} from "react";


const Home: NextPage = () => {
    // TODO: Implement this NextPage!
    const [isOpen, setIsOpen] = useState(false);
    return <div>
        <NewPostModal isOpen={true} onClose={() => setIsOpen(false)}>
        </NewPostModal>
    </div>;
}

export default Home
