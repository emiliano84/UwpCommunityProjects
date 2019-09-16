import { Text, Stack, Checkbox, PrimaryButton, Toggle, Pivot, PivotItem, Persona, PersonaSize, DefaultButton, Icon } from "office-ui-fabric-react";
import React from "react";
import { GetUserAvatar, GetCurrentUser, IDiscordUser, AuthData, IsUserInServer } from "../common/discordService";

import HoverBox from "../components/HoverBox";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DashboardHeader = styled.header`
background: linear-gradient(to bottom,#005799 0,#0076d1);
box-shadow: 0 12px 45px -8px rgba(0,120,215,.35);
width: 100vw;
padding: 10px;
`;

export const Dashboard = () => {
    const [welcomeMessage, setWelcomeMessage] = React.useState("Signing in...");
    const [userIcon, setUserIcon] = React.useState("");

    React.useEffect(() => {
        setupLoggedInUser();
    }, []);

    async function setupLoggedInUser() {
        let user: IDiscordUser | undefined = await GetCurrentUser();
        if (!user) return;
        setWelcomeMessage(`Welcome, ${user.username}`);
        setUserIcon(await GetUserAvatar(user) || "");
    }

    return (
        <Stack horizontalAlign="center" tokens={{ childrenGap: 15 }}>
            <DashboardHeader>
                <Stack style={{ padding: "10px" }} tokens={{ childrenGap: 10 }}>
                    <Persona style={{ margin: 0 }} styles={{ primaryText: { fontSize: "24px", color: "white" } }} size={PersonaSize.extraLarge} text={welcomeMessage} imageUrl={userIcon} />
                    <NavLink style={{ color: "white", textDecoration: "none" }} to="/dashboard/registerapp">
                        <Stack verticalAlign="center" horizontal tokens={{childrenGap: 5}}>
                            <Icon iconName="AppIconDefaultAdd"></Icon>
                            <Text variant="mediumPlus"> Register an app</Text>
                        </Stack>
                    </NavLink>

                </Stack>
            </DashboardHeader>

            {/* Todo, move most of these options out of here and into the user menu dropdown */}
            <Stack horizontal wrap horizontalAlign="center" tokens={{ childrenGap: 25 }}>
                <Stack horizontalAlign="center" tokens={{ childrenGap: 5 }}>
                    <Text variant="xLarge">My apps</Text>
                    <Text variant="large">You don't have any registered apps</Text>


                </Stack>

            </Stack>
        </Stack>
    )
};