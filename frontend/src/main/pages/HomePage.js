import React from "react";
import { useCurrentUser } from "main/utils/currentUser"; 
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const styles = {
    greeting: {
        fontSize: "75px",
        borderRadius: "7px",
        backgroundColor: "white",
        opacity: ".9",
        padding: "10px",
        textAlign: "center",
        margin: "3rem 0",
    },
    infoSection: {
        padding: "20px",
        borderRadius: "7px",
        margin: "20px 0",
    },
    main: {
        padding: "15px",
    }
};

export default function HomePage() {
    const { data: currentUser } = useCurrentUser();

    const getPartOfDayGreeting = () => {
        const hour = new Date().getHours();
        if (hour <= 12) return "Good morning";
        if (hour <= 18) return "Good afternoon";
        return "Good evening";
    };

    const greeting = getPartOfDayGreeting();
    const username = currentUser.loggedIn ? currentUser.root.user.githubLogin : "Please Sign In First to Proceed";

    return (
        <BasicLayout>
            <div data-testid="homePage-main-div" style={styles.main}>
                <h1 
                    data-testid="homePage-title" 
                    style={styles.greeting}
                >
                    {greeting}, {username}
                </h1>
                
                <h2 data-testid="homePage-info" style={styles.infoSection}>
                    This app is intended as a replacement for the <a href="https://ucsb-cs-github-linker.herokuapp.com">ucsb-cs-github-linker</a> app used in many courses at UCSB, as well as some courses at other universities.
                </h2>
                
            </div>
        </BasicLayout>
    );
}
