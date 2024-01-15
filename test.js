const { globSync } = require("glob")
const fs = require("fs/promises")
const path = require("path")

const f = async () => {
  function hexify(text) {
    var surr_offset = 0x10000 - (0xd800 << 10) - 0xdc00
    var str = text.trim()
    var len = str.length
    var result = []
    for (var i = 0; i < len; ++i) {
      var cp = str.charCodeAt(i)
      if (cp >= 0xd800 && cp < 0xdc00 && i < len - 1) {
        ncp = str.charCodeAt(i + 1)
        if (ncp >= 0xdc00 && ncp < 0xe000) {
          cp = (cp << 10) + ncp + surr_offset
          ++i
        }
      }

      if (cp.toString(16) !== "fe0f") {
        result.push(cp.toString(16))
      }
    }
    return result.join("_")
  }

  const emoji = [
    "⛹🏻",
    "🧗🏻",
    "🎤",
    "🚴🏻",
    "😅",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😂",
    "🤯",
    "🥺",
    "😢",
    "😱",
    "🫣",
    "😐",
    "🙄",
    "😮‍💨",
    "👏🏼",
    "💪🏻",
    "🫶🏼",
    "☝🏼",
    "🤳🏼",
    "👟",
    "🧤",
    "⚡",
    "🥤",
    "🍿",
    "⏳",
    "💡",
    "🎊",
    "🎉",
    "🎁",
    "📨",
    "❤️",
    "💛",
    "1️⃣",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "🔝",
    "🔜",
    "🕑",
    "💭",
    "💬",
    "⚽️",
    "🏀",
    "🎾",
    "🏐",
    "🏒",
    "🏓",
    "🥊",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🎮",
    "🔫",
    "💣",
    "🏋🏻‍♂️",
    "🏋🏻",
    "🏋🏻‍♀️",
    "🤼‍♀️",
    "🤼",
    "🤼‍♂️",
    "⛹🏻‍♀️",
    "⛹🏻",
    "⛹🏻‍♂️",
    "🤺",
    "🤾🏻‍♀️",
    "🤾🏻",
    "🤾🏻‍♂️",
    "🏌🏻‍♂️",
    "🏌🏻‍♀️",
    "🏌🏻",
    "🤽🏻‍♀️",
    "🤽🏻",
    "🤽🏻‍♂️",
    "🏇🏻",
    "🏄🏻‍♂️",
    "🏊🏻‍♀️",
    "🏊🏻‍♂️",
    "🚴🏻",
    "🚴🏻‍♀️",
    "🧗🏻",
    "🧗🏻‍♀️",
    "🎤",
    "🎮",
    "🎧",
    "🚨",
    "🖥",
    "⌛️",
    "⏳",
    "💵",
    "💰",
    "💊",
    "📆",
    "📅",
    "🍾",
    "💪",
    "😈",
    "🚀",
    "👍🏻",
    "👌🏻",
    "🤌🏻",
  ]

  console.log("emoji count", emoji.length)

  const pngs = globSync("./png/160/*.png")

  const foundEmoji = []

  emoji.forEach((e) => {
    const resultCode = hexify(e)

    const found = pngs.find((el) => el.includes(resultCode))

    if (found) {
      foundEmoji.push(found)
    } else {
      console.log("not found", resultCode)
    }
  })

  console.log(foundEmoji.length)

  if (emoji.length === foundEmoji.length) {
    console.log("Al emoji found, copying...")

    for (let p of foundEmoji) {
      const name = path.basename(p)

      try {
        await fs.copyFile(p, path.resolve("./filtered", name))
      } catch (err) {
        console.error(err)
      }
    }
  }
}

f()
