import {FC} from "react";
import {Box, Divider, Text} from "@chakra-ui/react";

interface Props {
    content: string;
    postedAt: Date;
}

const Comment: FC<Props> = ({content, postedAt}) => {
    // TODO: Implemnt a Comment!
    return <Box>
            <Text>
               {content} 
            </Text>
            <Divider></Divider>
            <Text>
               Posted: {postedAt} 
            </Text>
        </Box>
}

export default Comment;