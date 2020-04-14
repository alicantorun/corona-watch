/**
 * Renders language switcher
 *
 * @module Components/LanguageSwitcher
 * @flow
 */

import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import { Language } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
// import { getLanguageWhiteList } from "configs/i18n";

// import ReactCountryFlag from "react-country-flag";

const ITEM_HEIGHT = 48;

export default function LanguageSwitcher(props: Object) {
  const { i18n } = useTranslation();
  const { color } = props;
  const [anchorElement, setAnchorElement] = useState(null);
  const switchLanguage = async (language) => {
    setAnchorElement(null);
    i18n.changeLanguage(language);
  };
  return (
    <>
      <IconButton onClick={(e) => setAnchorElement(e.currentTarget)}>
        <Language style={{ color: color, zIndex: 99 } || null} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={(e) => setAnchorElement(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        {[
          { display: "English", key: "en" },
          { display: "Turkish", key: "tr" },
        ].map((option) => (
          <MenuItem
            key={option.key}
            selected={option.key === i18n.language}
            onClick={() => switchLanguage(option.key)}
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                {/* <ReactCountryFlag
                  // for new languages (if applicable)
                  // language code must be mapped to country code
                  countryCode={option === "en" ? "gb" : option}
                  png
                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                /> */}
              </Grid>
              <Grid item>{option.display}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
