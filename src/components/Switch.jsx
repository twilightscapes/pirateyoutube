import React, { useState, useEffect, useCallback } from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { PiHandSwipeRightFill } from "react-icons/pi";
import useSiteMetadata from "../hooks/SiteMetadata";

function Header() {
    const [archiveView, setArchiveView] = useState("");
    const [showSwipe] = useState(true);

    const { language } = useSiteMetadata();
    const { dicSwipe, dicScroll } = language;

    const applyArchiveView = useCallback(() => {
        const elements = document.querySelectorAll(".contentpanel");
        elements.forEach((el) => {
            if (archiveView === "grid") {
                el.classList.remove("horizontal-scroll", "panels");
                el.classList.add("grid-container");
                document.body.classList.remove('scroll');
            } else if (archiveView === "swipe") {
                el.classList.remove("grid-container");
                el.classList.add("horizontal-scroll", "panels");
                document.querySelector(".contentpanel").style.transition = "all .5s ease-in-out";
                window.scrollTo(0, 0);
                document.body.classList.add('scroll');
            }
        });
    }, [archiveView]);

    useEffect(() => {
        if (showSwipe) {
            const storedArchiveView = localStorage.getItem("archiveView");
            // Use the stored value or default to 'grid' or 'swipe'
            setArchiveView(storedArchiveView || (showSwipe ? "grid" : "swipe"));
        }
    }, [showSwipe]);

    useEffect(() => {
        applyArchiveView();
        // Update local storage whenever archiveView changes
        localStorage.setItem("archiveView", archiveView);
    }, [archiveView, applyArchiveView]);

    const toggleArchiveView = () => {
        const newArchiveView = archiveView === "grid" ? "swipe" : "grid";
        setArchiveView(newArchiveView);
    };

    return (
        <div>
            <button
                aria-label="Grid/Swipe View"
                onClick={toggleArchiveView}
                className="swipescroll"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0px",
                    textAlign: "center",
                    width: "100%"
                }}
            >
                {archiveView === "grid" ? (
                    <div className="themer"><PiHandSwipeRightFill style={{ width: '36px', height: '30px' }} /></div>
                ) : (
                    <div className="themer"><BsFillGrid3X2GapFill style={{ width: '36px', height: '30px' }} /></div>
                )}
                <span className="themetext" style={{ fontSize: '' }}>
                    {archiveView === "grid" ? dicSwipe : dicScroll}
                </span>
            </button>
        </div>
    );
}

export default Header;
