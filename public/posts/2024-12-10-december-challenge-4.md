---
title: "December Challenge #4"
faviconEmoji: "🎄"
tags: ["december challenge"]
---

Switching gears from the previous days.

For the longest time, I've been wanting to use/make an app or webapp, that can list my YouTube Watch Later playlist items.

A long time ago, YouTube removed the possibility to read the items of that list. The following is a direct quote from their [docs](https://developers.google.com/youtube/v3/docs/playlists/list#errors):

> The API does not support the ability to list the specified playlist. For example, you can't list your watch later playlist.

As a user of many years, I have today 2100 videos in that playlist. Some people will say that's too many, others will say that's just a Thursday. But that's my list.

In any case, what I do with that list is that I go to it when I am:

- bored,
- eating at my desk and want to watch something without having to browse,
- going on a trip, so I can download some videos on my devices to watch on the plane.

The way the youtube app on iOS and iPadOS work, this list is slow to scroll through, and on web, it's paginated, so you need to click next next next. These, combined with the list being inaccessible via api, makes for a sad Pavlos, and for a naughty Google.

My latest trial was to build a scraper, that would go on the website and slowly click next next next, getting the video IDs of each item, and giving them back to me.

Today I thought I'll give AIs a chance. Maybe they will hit the same walls I did, or maybe they will figure out some other way.

So I started with ChatGPT o1. I thought now that it's officially out, and it's the "smart" one, it might have a nice plan. So I asked:

> i want to get a list of all videos in the Watch Later playlist on youtube. i can use code, or any other tool, as long as i dont have to do it manually by clicking on the next page arrow a million times. Suggestions?

And it gave me some Python code that was using the api. So I, thinking the AI already failed, told it that the Watch Later playlist cannot be accessed via api.

That's when it replied that you can actually get the list, "using the YouTube Data API as long as you’re authenticated". But in the same reply, it suggested that if I want to avoid that api, I could use [yt-dlp](https://github.com/yt-dlp/yt-dlp). I already use that every now and then, but apparently I was missing a whole other aspect of it.

ChatGPT o1 suggested the following command:

> `yt-dlp --flat-playlist --get-title --get-id --cookies cookies.txt "https://www.youtube.com/playlist?list=WL"`

Here, `cookies.txt` comes from just exporting my browser cookies for YouTube. So I tried it, and it worked! It printed 2100 lines of either video IDs or video titles.

So I removed the `--get-title` and ran it again, and saved the output in a txt file.

Wow! Already I'm further than I was able to get last time I tried, and the time before it. TIL yt-dlp can download playlists too!

After that, I was excited. I decided to go all in. Let's try to use AI to make a super-simple webapp, that will read these video IDs and give me a looooong list of thumbnails, titles, channel names, and a link to the video on YouTube.

I went to [bolt.new](https://bolt.new), which I found out from a friend last week. I told it:

> i want a webapp (that also works on mobile). the main thing should be that its a list of videos. i will provide a list of video ids for youtube, for example 0yXYSrTfo4E, and i want the webapp to show this list with a thumbnail and title and channel. when i click the item, it should just redirect to the actual youtube link.

(Note the video ID, which is a video about bolt.new lol.)

And it did! Almost. It made a webapp that was not working, with an error it asked me to ask it to solve.

And it did! This time it actually did. I saw an error saying "API key missing", but it was rendered in the webapp. I asked it to add an input field for the api key, and then I pasted in my api key, and there it was! The video ID I had in the prompt, along with rickroll and some other video about the zoo (wait, is that the first video on YouTube? I vaguely remember that video being talked about.), complete with thumbnails, titles, and channel names!

![](https://f000.backblazeb2.com/file/dropshare-public-pavlos/Photo-5355.JPG)

At that point, it had the list of videos hardcoded, so I asked it to add another input field for the video IDs, and boom.

![](https://f000.backblazeb2.com/file/dropshare-public-pavlos/Screenshot-2024-12-10-at-21.39.30.png)

So now I have what I wanted for the last like 6 years or so. I might take an afternoon and make it a bit more nice, add a functioning "remove from Watch Later" button (which might also not work via tha api 🤔), and then have it deployed on some vercel/netlify thing, and use that from now on!

All in all, I was pretty impressed today with both AIs. I use them every now and then, and I still felt kind of skeptical. I'm not against them, I like them, but I thought they are not "there" yet. Today was the first time I thought huh, maybe they are there, or at least much closer than they were.

Does this count for december challenge?

Yes. Didn't we agree [yesterday](https://lmno.lol/pvinis/december-challenge-3) that it's all about enjoying this challenge? We did. And I enjoyed prompting, testing, and using this little webapp.

I'll worry about it taking my job another time. I don't think it will though. Long discussion, for another time.
