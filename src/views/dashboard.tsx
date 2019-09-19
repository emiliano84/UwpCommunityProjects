import { Text, Stack, Persona, PersonaSize, Icon, Link, Dialog, DialogType, DefaultButton } from "office-ui-fabric-react";
import React from "react";
import { GetUserAvatar, GetCurrentUser, IDiscordUser, discordAuthEndpoint } from "../common/services/discord";

import HoverBox from "../components/HoverBox";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { RegisterApp } from "../components/registerApp";

const DashboardHeader = styled.header`
background: linear-gradient(to bottom,#005799 0,#0076d1);
box-shadow: 0 12px 45px -8px rgba(0,120,215,.35);
width: 100vw;
margin: 0px;
padding: 15px 0px;
`;

export const Dashboard = () => {
    const [welcomeMessage, setWelcomeMessage] = React.useState("Signing in...");
    const [userIcon, setUserIcon] = React.useState("");

    const [appRegistrationShown, setAppRegistrationShown] = React.useState(false);

    React.useEffect(() => {
        setupLoggedInUser();
    }, []);

    async function setupLoggedInUser() {
        let user: IDiscordUser | undefined = await GetCurrentUser();
        if (!user) {
            window.location.href = discordAuthEndpoint;
            return;
        };
        setWelcomeMessage(user.username);
        setUserIcon(await GetUserAvatar(user) || "");
    }

    const PersonaDark = styled(Persona)`
    * {
        :hover {
            color: white;
        }
        color: #f7f7f7;
        font-size: 22px;
    }
    `;

    const SectionTitleIconFontSize = 34;

    const DashboardColumnFiller = styled.div`
    @media only screen and (max-width: 807px) {
        display: none;
    } 
    `;

    return (
        <Stack tokens={{ childrenGap: 25 }}>
            <DashboardHeader>
                <Stack horizontal wrap style={{ padding: "15px 0px", margin: 0 }} verticalAlign="center" horizontalAlign="space-around" tokens={{ childrenGap: 25 }}>
                    <PersonaDark size={PersonaSize.extraLarge} text={welcomeMessage} imageUrl={userIcon} />

                    <Stack horizontal wrap verticalAlign="end" tokens={{ childrenGap: 10 }} style={{ marginLeft: 10 }}>

                        <Link style={{ color: "white", width: "150px", textDecoration: "none" }} onClick={() => setAppRegistrationShown(true)}>
                            <Stack verticalAlign="end" horizontalAlign="center" tokens={{ childrenGap: 5 }}>
                                <Icon style={{ fontSize: 35 }} iconName="AppIconDefaultAdd"></Icon>
                                <Text variant="mediumPlus">Register an app</Text>
                            </Stack>
                        </Link>

                        <Link style={{ color: "white", width: "150px", textDecoration: "none", marginBottom: 2.5 }} to="/dashboard/registerapp">
                            <Stack verticalAlign="end" horizontalAlign="center" tokens={{ childrenGap: 5 }}>
                                <Icon style={{ fontSize: 35 }} iconName="Robot"></Icon>
                                <Text variant="mediumPlus">Manage your roles</Text>
                            </Stack>
                        </Link>

                    </Stack>

                    <DashboardColumnFiller style={{ width: 200 }} />
                </Stack>
            </DashboardHeader>

            <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
                    <Icon style={{ fontSize: "24px" }} iconName="BuildDefinition" />
                    <Text variant="xLarge">Under construction</Text>
                </Stack>

                <Text variant="large">This area is still being worked on. Check back later</Text>
            </Stack>

            <Stack horizontalAlign="center" wrap horizontal tokens={{ childrenGap: 20 }}>

                {/* Todo: Hide this area if the user doesn't have Dev role, or no apps are registered */}
                <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                    <Stack horizontal tokens={{ childrenGap: 15 }}>
                        <Icon iconName="AppIconDefaultList" style={{ fontSize: SectionTitleIconFontSize }} />
                        <Text variant="xLarge" style={{ fontWeight: 600 }}>My apps</Text>
                    </Stack>

                    <HoverBox style={{ height: 250, padding: 15 }}>
                        <Text variant="large">You don't have any registered apps</Text>
                    </HoverBox>
                </Stack>

                <Dialog isOpen={appRegistrationShown} dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: 'Register an app',
                }}>
                    <RegisterApp onCancel={() => setAppRegistrationShown(false)} />
                </Dialog>
            </Stack>
        </Stack >
    )
};