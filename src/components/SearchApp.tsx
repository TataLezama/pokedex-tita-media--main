import { useState } from "react"

export default function SearchApp() {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  }

  const [numberActive, setNumberActive] = useState(true);

  const toggleNumber = () => {
    if (nameActive) setNameActive(false);

    if (!numberActive) setNumberActive(!numberActive);

    setIsActive(!isActive)
  }

  const [nameActive, setNameActive] = useState(false)

  const toggleName = () => {
    if (numberActive) setNumberActive(false);

    if (!nameActive) setNameActive(!nameActive);
    
    setIsActive(!isActive);
  }

  return (
    <>
      <div className="search">
        <input type="text" placeholder="Search" />
        <button className="search__button">
            <img src="/assets/images/search.svg" alt="icon search" />
        </button>
        <div className="search-filter">
          <button
            className="search-filter__button"
            onClick={toggleClass}
            >
              <img className={ nameActive ? "active" : "" } src="/assets/images/text_format.svg" alt="icon text format" />
              <img className={ numberActive ? "active" : "" } src="/assets/images/tag.svg" alt="icon tag" />
          </button>
          <nav className={ isActive ? "search-filter__nav active" : "search-filter__nav" }>
              <span className="search-filter__nav-title">Sort by:</span>
              <div className="nav-list">
                <button onClick={toggleNumber}>
                  <span className={ numberActive ? "active" : "" }></span>
                  Number
                </button>
                <button onClick={toggleName}>
                  <span className={ nameActive ? "active" : "" }></span>
                  Name
                </button>
              </div>
          </nav>
        </div>
      </div>
    </>
  )
}
