(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{306:function(e,t,s){"use strict";s.r(t);var a=s(13),i=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"spyglass-plugin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spyglass-plugin"}},[e._v("#")]),e._v(" Spyglass Plugin")]),e._v(" "),t("h2",{attrs:{id:"description"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#description"}},[e._v("#")]),e._v(" Description")]),e._v(" "),t("p",[e._v("This plugin runs the "),t("a",{attrs:{href:"https://github.com/roamingthings/spyglass",target:"_blank",rel:"noopener noreferrer"}},[e._v("Spyglass"),t("OutboundLink")],1),e._v(" webcam streaming service as a DSF plugin. The main "),t("code",[e._v("spyglass.conf")]),e._v(" file is accessible via "),t("code",[e._v("0:/sys/spyglass.conf")]),e._v(".")]),e._v(" "),t("p",[e._v("Depending on your choice of camera, extra customizations may be required.")]),e._v(" "),t("p",[e._v("This plugin requires DSF >= 3.5 and Python >= 3.8 (i.e. Debian Bookworm or newer).")]),e._v(" "),t("h2",{attrs:{id:"setup-in-dwc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#setup-in-dwc"}},[e._v("#")]),e._v(" Setup in DWC")]),e._v(" "),t("p",[e._v("To configure this service in DWC, go to the "),t("code",[e._v("Settings")]),e._v(" -> "),t("code",[e._v("General")]),e._v(" page and make the following changes:")]),e._v(" "),t("ul",[t("li",[e._v("Set "),t("code",[e._v("Webcam URL")]),e._v(" to "),t("code",[e._v("http://[HOSTNAME]:8080/stream")])]),e._v(" "),t("li",[e._v("Set "),t("code",[e._v("Webcam update interval (in ms)")]),e._v(" to "),t("code",[e._v("0")])]),e._v(" "),t("li",[e._v("Go to the "),t("code",[e._v("Job")]),e._v(" -> "),t("code",[e._v("Webcam")]),e._v(" page to see your live stream")])]),e._v(" "),t("p",[e._v("For snapshots it is also possible to use "),t("code",[e._v("http://[HOSTNAME]:8080/snapshot")]),e._v(" instead.")]),e._v(" "),t("h2",{attrs:{id:"build-instructions"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#build-instructions"}},[e._v("#")]),e._v(" Build instructions")]),e._v(" "),t("p",[e._v("Create a ZIP file of every file in the "),t("code",[e._v("src")]),e._v(" directory and make sure "),t("code",[e._v("plugin.json")]),e._v(" is at the root level. Once created, the ZIP can be installed as a third-party plugin.\nIf a Debian package is supposed to be generated, check out to the "),t("code",[e._v("pkg/build.sh")]),e._v(" script.")]),e._v(" "),t("h2",{attrs:{id:"logging"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#logging"}},[e._v("#")]),e._v(" Logging")]),e._v(" "),t("p",[e._v("Unfortunately this service outputs info and warning log messages even if the log level is initially set, so by default this plugin's configuration suppresses all the log messages and only sends them to the "),t("code",[e._v("duetpluginservice")]),e._v(" journal log.")]),e._v(" "),t("h3",{attrs:{id:"checking-the-journald-log-recommended-way"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#checking-the-journald-log-recommended-way"}},[e._v("#")]),e._v(" Checking the journald log (recommended way)")]),e._v(" "),t("p",[e._v("To view the log of the Spyglass service, open a Linux console (or connect over SSH) and run")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("journalctl -u duetpluginservice -f\n")])])]),t("p",[e._v("Then restart the Motion Webcam Server plugin and look for potential errors.")]),e._v(" "),t("h3",{attrs:{id:"modify-plugin-manifest-to-see-all-messages-in-dwc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#modify-plugin-manifest-to-see-all-messages-in-dwc"}},[e._v("#")]),e._v(" Modify plugin manifest to see all messages in DWC")]),e._v(" "),t("p",[e._v("To see all the output messages from the Spyglass service directly in DWC, open "),t("code",[e._v("plugin.json")]),e._v(" and set "),t("code",[e._v("sbcOutputRedirected")]),e._v(" from "),t("code",[e._v("false")]),e._v(" to "),t("code",[e._v("true")]),e._v(". Then build the plugin again and overwrite the existing installation.\nOnce the plugin is restarted, all the log messages are written to the DWC console.")])])}),[],!1,null,null,null);t.default=i.exports}}]);