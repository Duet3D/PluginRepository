(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{305:function(e,t,s){"use strict";s.r(t);var o=s(13),i=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"readme"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#readme"}},[e._v("#")]),e._v(" README")]),e._v(" "),t("p",[e._v("This plugin provides periodic or instant backups of duet3d SBC files.  Backups are made to a Github repository, thereby facilitating the ability to roll back to earlier file versions.")]),e._v(" "),t("p",[t("strong",[e._v("Modes of operation")]),e._v("\nThere are two modes of operation, depending on whether the archive option is used.")]),e._v(" "),t("p",[t("em",[t("strong",[e._v("Files deleted from the source are deleted from the main branch (default)")])]),e._v("\nThe designated directories are compared to the files in the "),t("code",[e._v("main")]),e._v(" branch. Files are either Added (new files), Updated (if changed), or Skipped (if not changed).  Files that have been deleted from the designated directories are removed from the "),t("code",[e._v("main")]),e._v(" branch.  In this way, the "),t("code",[e._v("main")]),e._v(" branch is a snapshot of the designated directories.")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("If you need to recover to the latest version - a simple download of the top level `main` branch is all that is needed.\n\nGithub history still provides access to previously deleted files.\n")])])]),t("p",[t("em",[t("strong",[e._v("Files are not deleted from the main branch")])]),e._v("\nThe behavior is the same as above, except that files which are deleted from the source are NOT  deleted from the main branch.  This makes recovery a little more involved.")]),e._v(" "),t("p",[t("strong",[e._v("Prerequisites:")]),e._v("\nDuet3d SBC V3.x\nPython >= 3.8")]),e._v(" "),t("p",[e._v("Tested with Debian Bullseye and Bookwork on V3.5.4 and V3.6")]),e._v(" "),t("p",[t("strong",[e._v("Versions")])]),e._v(" "),t("p",[t("em",[t("strong",[e._v("V1.0")])])]),e._v(" "),t("ul",[t("li",[e._v("Initial release")])]),e._v(" "),t("p",[t("em",[t("strong",[e._v("V1.1")])])]),e._v(" "),t("ul",[t("li",[e._v("Added messages, sent to DWC")]),e._v(" "),t("li",[e._v("Displays time to next backup using local time (previously GMT)")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("-duetPassword")]),e._v(" to support for printers that use a password")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("-verbose")]),e._v(" to enable more detailed log messages.")])]),e._v(" "),t("p",[t("em",[t("strong",[e._v("V1.2")])])]),e._v(" "),t("ul",[t("li",[e._v("Added "),t("code",[e._v("-noDelete")]),e._v(" option")]),e._v(" "),t("li",[e._v("Compares files to determine if an update is needed.")]),e._v(" "),t("li",[e._v("Added date / time of last change to file (except initial save).")])]),e._v(" "),t("p",[t("em",[t("strong",[e._v("V1.3")])])]),e._v(" "),t("ul",[t("li",[e._v("README.md file shows date and time of last backup\n-README.md prevented from being deleted")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("-ignore")]),e._v(". Can specify files that are not to be backed up. This also causes these files to be deleted unless "),t("code",[e._v("-noDelete")]),e._v(" is set.")])]),e._v(" "),t("p",[t("em",[t("strong",[e._v("V1.4")])])]),e._v(" "),t("ul",[t("li",[e._v("Added logging to logfile")]),e._v(" "),t("li",[e._v("updated deprecated python calls")]),e._v(" "),t("li",[e._v("added file change summary info to README.md\n'''")])]),e._v(" "),t("h3",{attrs:{id:"setup"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#setup"}},[e._v("#")]),e._v(" Setup")]),e._v(" "),t("p",[e._v("Instructions for setup / installation are in the file "),t("code",[e._v("Documents/setup.md")])])])}),[],!1,null,null,null);t.default=i.exports}}]);