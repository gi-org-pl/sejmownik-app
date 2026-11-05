import myPoliticsLogo from "@/assets/icons/mypolitics-primary-blue-on-light.svg";
import sejmownikLogo from "@/assets/icons/sejmownik-logo.svg";

// Brand lockup: myPolitics logo, a vertical dash with 12 px side padding, then
// the Sejmownik logo.
export const HeaderBrand = () => {
  return (
    <div className="flex items-center">
      <img
        src={myPoliticsLogo}
        alt=""
        aria-hidden="true"
        className="h-6 w-auto"
      />
      <div className="flex items-center px-3" aria-hidden="true">
        <div className="h-4 w-px bg-gi-primary/25" />
      </div>
      <img
        src={sejmownikLogo}
        alt=""
        aria-hidden="true"
        className="h-6 w-auto"
      />
    </div>
  );
};
