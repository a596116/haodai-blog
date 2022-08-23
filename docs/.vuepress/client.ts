import { defineClientConfig } from "@vuepress/client"
import { addIcons } from "oh-vue-icons"
import {
  CoGit,
  HiSolidHome,
  FaFortAwesome,
  FaSatelliteDish,
  FaTag,
  OiGitCompare,
  OiRocket,
  RiBilibiliLine,
  BiInstagram,
  RiBook2Fill,
  RiGithubLine,
  RiSailboatLine,
  RiVuejsLine,
  FaJsSquare,
  CoHtml5,
  IoLogoCss3
} from "oh-vue-icons/icons"

addIcons(
  BiInstagram,
  RiBilibiliLine,
  FaFortAwesome,
  FaTag,
  HiSolidHome,
  FaSatelliteDish,
  RiBook2Fill,
  RiVuejsLine,
  CoGit,
  RiGithubLine,
  OiGitCompare,
  OiRocket,
  RiSailboatLine,
  FaJsSquare,
  CoHtml5,
  IoLogoCss3
)

export default defineClientConfig({})
