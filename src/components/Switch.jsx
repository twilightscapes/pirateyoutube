
import React, { useState, useEffect, useCallback } from "react";


function Header() {
    const [archiveView, setArchiveView] = useState("");
    const [showSwipe] = useState(true);

    const applyArchiveView = useCallback(() => {
        const elements = document.querySelectorAll(".contentpanel");
        elements.forEach((el) => {
            if (archiveView === "grid") {
                el.classList.remove("horizontal-scroll", "panels");
                el.classList.add("grid-container");

            } else if (archiveView === "swipe") {
                el.classList.remove("grid-container");
                el.classList.add("horizontal-scroll", "panels");
                document.querySelector(".contentpanel").style.transition = "all .5s ease-in-out";
                window.scrollTo(0, 0);
            }
        });
        localStorage.setItem("archiveView", archiveView);
    }, [archiveView]);

    useEffect(() => {
        if (showSwipe) {
            // Retrieve the selected option from local storage or default to 'grid' or 'swipe'
            const storedArchiveView = localStorage.getItem("archiveView");
            setArchiveView(storedArchiveView || (showSwipe ? "grid" : "swipe"));
        }
    }, [showSwipe]);

    useEffect(() => {
        // Apply the selected option on page load
        applyArchiveView();
    }, [applyArchiveView]);

    const toggleArchiveView = () => {
        const newArchiveView = archiveView === "grid" ? "swipe" : "grid";
        setArchiveView(newArchiveView);
        applyArchiveView();
        console.log("Button clicked");
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
                }}
            >
                {archiveView === "grid" ? (
                    <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#999999" style={{ height: '30px' }}>

                        <g id="bgCarrier" strokeWidth="0" />

                        <g id="tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                        <g id="iconCarrier"> <path d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.07989 21 8.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M10 9L7 12L10 15M14 9L17 12L14 15" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>

                    </svg>
                ) : (
                    <svg width="38px" height="38px" viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg" fill="#999" stroke="#999" strokeWidth="0.544" style={{ height: '30px' }}>

                        <g id="bgCarrier" strokeWidth="0" />

                        <g id="tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

                        <g id="iconCarrier"> <path d="m 2 1 c -0.554688 0 -1 0.445312 -1 1 v 4 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -4 c 0 -0.554688 -0.445312 -1 -1 -1 z m 8 0 c -0.554688 0 -1 0.445312 -1 1 v 4 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -4 c 0 -0.554688 -0.445312 -1 -1 -1 z m -8 8 c -0.554688 0 -1 0.445312 -1 1 v 4 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -4 c 0 -0.554688 -0.445312 -1 -1 -1 z m 8 0 c -0.554688 0 -1 0.445312 -1 1 v 4 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -4 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" fill="#999" /> </g>

                    </svg>
                )}
                <span className="themetext" style={{ fontSize: '10px' }}>
                    {archiveView === "grid" ? "swipe" : "scroll"}
                </span>
            </button>
        </div>



    );
}

export default Header;
