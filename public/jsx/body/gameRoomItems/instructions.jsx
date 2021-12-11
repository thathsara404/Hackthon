import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Instructions () {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1bh-content'
                    id='panel1bh-header'
                >
                    <Typography variant={'body1'} sx={{ width: '33%', flexShrink: 0 }}>
                        About Wiley Gaming
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Learn and Fun</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Wiley Gaming Platform is a real time quiz room that offers rewards for its winners.
                        Here you can compete with the same course students and maintain your rank on the Score Board.
                        You can test your knowledge against the other students in the same course and you will be 
                        encouraged by Wiley Gaming to learn the content more accurately.
                        Take your time and show off yourself !.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2bh-content'
                    id='panel2bh-header'
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Learn to Earn</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Earn Crypto Token
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our gaming platform is a great place to improve your knowledge.
                        Not only that but also we are happy to announce,
                        you will be rewarded with a Crypto Token if you become the top scorer.
                        The system will select the highest ranked student in the Score Board weekly and
                        will send the reward based on your preferred way.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel3bh-content'
                    id='panel3bh-header'
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        How to play
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Read more
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    As you already know, first you need to log into the Wiley learning material.
                        Then you can visit your gaming profile by clicking the Gaming Profile button.
                        Here you have two spaces called, Score Board and Game Room.
                        In the Score Board, you will see your profile and your ranks (Overall Rank & Last Session Rank).
                        In the Game Room, you will see the students who are currently active and willing 
                        to play the game.
                        You can create a new game instance by clicking the CREATE button. Or else you
                        can join an active game instance
                        by clicking JOIN button.
                        Once you successfully joined to a game instance,
                         you and others in the instance will get the same set of questions.
                        You have to answer the questions within the given time period.
                        Once you complete it, the result will be on the Score Board.

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel4bh-content'
                    id='panel4bh-header'
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>About the award</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Select your preferred method
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    You are free to select your preferred method of getting the awards.
                    We offer two methods. They are Crypto and Coupons.
                    You can select your preferred method while purchasing your product.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
