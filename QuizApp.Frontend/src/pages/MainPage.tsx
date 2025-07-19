import { Link } from "react-router-dom";
import {
    MainPageWrapper,
    MainPageHeading,
    MainPageSubtext,
    StartCreateButton,
    ExploreButton
} from "@components/layouts/MainPageLayout";

const MainPage = () => {
    return (
        <MainPageWrapper>
            <MainPageHeading variant="h1">
                Welcome to QuizApp
            </MainPageHeading>

            <MainPageSubtext variant="h5">
                The ultimate platform for creating and taking quizzes
            </MainPageSubtext>

            <div>
                <Link to={"/quiz/create"}>
                    <StartCreateButton>
                        Quiz Creator
                    </StartCreateButton>
                </Link>
                <Link to={"/explore"}>
                    <ExploreButton>
                        Explore quizzes
                    </ExploreButton>
                </Link>
            </div>
        </MainPageWrapper>
    );
};

export default MainPage;