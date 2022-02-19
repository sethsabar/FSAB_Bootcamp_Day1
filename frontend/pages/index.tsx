import type {NextPage} from 'next'
import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import Post from "../components/Post";
import NewPostModal from "../components/NewPostModal";
import {useState} from "react";

const Home: NextPage = () => {
    // TODO: Implement this NextPage!
    return <NewPostModal isOpen={false} onClose={function (): void {
        throw new Error('Function not implemented.');
    } }/>;
}

export default Home
