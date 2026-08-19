import InfiniteScroller from "./InfiniteScroller";
import ScrollTacker from "./ScrollTracker";
import Search from "./Search";
import Counter from "./Counter";
import Accordion from "./Accordion";
import ModalParent from "./ModalParent";

const Body = () => {
  return (
    <div className="body">
      <Search />
      {/* <Counter /> */}
      {/* <InfiniteScroller /> */}
      <Accordion />
      <ModalParent />
    </div>
  );
};

export default Body;
