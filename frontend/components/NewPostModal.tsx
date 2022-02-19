import {FC, FormEvent, useState} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Button, Input, Textarea, VStack} from "@chakra-ui/react";
import axios from "axios";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const NewPostModal: FC<Props> = ({isOpen, onClose}) => {
    // TODO: Fill out this handleSubmit function!
    //function handleSubmit(e: any) {}
    // TODO: Implemnt a NewPostModal!

    return <div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Insert text here
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </div>;
}

export default NewPostModal;
