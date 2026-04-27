const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "team@hillgliga.com";

const emailTexts = {
  "Self-Organization": {
    low: {
      see: `There's almost always one person who's become the go-to for every decision. "Should I pick up this ticket?" "Who do I talk to about this blocker?" "Can I start on this before the other thing is done?" The team isn't incapable. They've just learned that asking is safer than deciding. And the longer this goes on, the harder it is to break, because now the person fielding all those questions thinks the team genuinely can't function without them.`,
      plan: `<strong>Your action plan: Self-assigning work from the backlog</strong>
<p><em>Step 1: Set the rule</em><br/>At your next standup, tell the team: "From today, when you finish a task, pull the next one yourself. Top of the backlog, first item that matches your skills. No need to check with anyone."</p>
<p><em>Step 2: Hold the line</em><br/>When someone comes to ask anyway (usually within the first hour), don't give them the answer. Say: "What do you think makes sense?" Let them answer their own question. This will feel uncomfortable. That's the point.</p>
<p><em>Step 3: Debrief at end of week</em><br/>Five minutes at the end of Friday standup: "We've been self-assigning for a week. What worked? What felt weird?" No retro, no ceremony. Just a quick conversation.</p>`,
      results: `After one week, you'll probably see 2-3 people who adapted immediately and started pulling work without thinking twice. And 1-2 who kept asking for permission anyway. That split is normal and healthy. After two weeks, even the hesitant ones usually stop asking, especially if they see that nothing bad happened to the people who just went ahead.`,
      watchOut: `The biggest risk isn't that someone picks the wrong task. It's that you or the team lead unconsciously undermine the experiment by "suggesting" which task to pick next. That's just assignment with extra steps. If the backlog is properly prioritized, any top item is a valid choice. If it's not properly prioritized, that's a different problem to solve first.`,
      tips: `Make sure the backlog is sorted before you start this experiment. If the team opens the board and sees 40 items with no clear order, they'll freeze. And that won't be a confidence problem, it'll be an information problem. Also, celebrate the first person who pulls a task without asking. Not in a big way. Just a quick "nice, thanks for grabbing that" in the team channel. It signals to everyone else that this is the new normal.`
    },
    mid: {
      see: `The team handles routine work fine. Sprint is planned, tasks are clear, people pick things up and get them done. The problem shows up when something unexpected happens. A requirement is unclear. Two tasks conflict with each other. Someone's blocked and the person who could help is busy. In those moments, the team stops and waits. They wait for the standup. They wait for the SM. They wait for someone to tell them what the right move is. The capability is there, the confidence isn't.`,
      plan: `<strong>Your action plan: Hand over standup facilitation</strong>
<p><em>Step 1: Announce the change</em><br/>At the beginning of the next sprint, tell the team: "For the next two weeks, I'm stepping back from facilitating standup. You run it yourselves. Same time, same format, same purpose. I'll be there but I won't be leading it."</p>
<p><em>Step 2: Pick a rotation</em><br/>Don't assign a single replacement facilitator. Rotate it daily. Go alphabetical, go by Jira avatar order, whatever. The point is that everyone gets a turn and nobody becomes the new "leader."</p>
<p><em>Step 3: Stay quiet</em><br/>This is the hard part. You'll be in the standup and you'll hear things that you'd normally jump in on. A blocker that nobody addresses. A dependency nobody mentions. Bite your tongue for the first week. Write it down. If it's still unresolved after 24 hours, then bring it up. Not during standup, but in a 1-on-1 with the person involved.</p>`,
      results: `The first 2-3 standups will be awkward. Shorter than usual, or longer than usual, with a lot of looking around and silence. By day 4 or 5, someone will naturally start taking ownership. By the end of two weeks, you'll notice the team solving things in the moment instead of parking them. The quality of the standup conversation usually gets better too, because people talk to each other instead of reporting to the facilitator.`,
      watchOut: `There's a chance one person dominates and essentially becomes the new SM. If that happens, it's not a failure, but you'll want to address it. Talk to that person privately: "I noticed you've been driving standup, and you're great at it. But part of this experiment is making sure everyone builds that muscle. Can you hold back a little next week and let others step up?"`,
      tips: `If the team looks at you for answers during standup, redirect physically. Look at the person they should be talking to instead of looking at you. Body language matters more than words here. Also, don't debrief the standup experiment in a formal retro. Just ask casually after a week: "How's it going with running standup yourselves? Anything you want to change?" Keep it light.`
    }
  },
  "Continuous Improvement": {
    low: {
      see: `Retros happen, but they feel like a box-ticking exercise. People share things that went well, things that didn't, and some action items get written on sticky notes or in Confluence. Then the next sprint starts and nobody looks at them again. After a few cycles of this, the team stops taking retros seriously because nothing ever actually changes. They start saying things like "we've talked about this before" or "it's just how things are." The SM ends up being the only person who cares about improvement, and even they start running out of energy.`,
      plan: `<strong>Your action plan: One experiment per sprint, tracked publicly</strong>
<p><em>Step 1: At your next retro, pick ONE thing</em><br/>Not three. Not five. One. Ask the team: "If we could only fix one thing about how we work this sprint, what would make the biggest difference?" Let them vote. Majority wins.</p>
<p><em>Step 2: Turn it into a concrete experiment</em><br/>Don't write "improve communication." Write "For the next sprint, anyone who's blocked for more than 30 minutes posts in the team Slack channel immediately instead of waiting for standup." Specific, observable, time-boxed.</p>
<p><em>Step 3: Put it on the board</em><br/>Create a card or a sticky at the top of your sprint board that says "Sprint Experiment: [the thing]." It needs to be visible every single day. Not buried in Confluence. Not in retro notes nobody reads. On the board, where everyone looks.</p>
<p><em>Step 4: Review it at next retro</em><br/>First agenda item, before anything else: "Did we run the experiment? What happened?" This is where most teams fail. They skip this step and move on to new complaints. Don't let that happen.</p>`,
      results: `The first experiment will probably be underwhelming. That's fine. The point isn't to transform the team in one sprint. The point is to prove that change is possible. By the third sprint of doing this consistently, something shifts. People start suggesting experiments outside of retros. They start noticing things they want to try. The improvement muscle starts working on its own.`,
      watchOut: `The temptation to pick something big and ambitious. "Let's refactor the entire CI pipeline" is not a sprint experiment. Neither is "let's improve our relationship with the product team." Pick something so small it feels almost silly. Small wins build momentum. Big goals build disappointment.`,
      tips: `Take a photo of the experiment card on the board and post it in the team channel at the start of the sprint. It sounds trivial but it creates a moment of public commitment. People are more likely to follow through on something they've seen written down and shared than something that was just mentioned in a meeting.`
    },
    mid: {
      see: `The retros are actually decent. People are honest, ideas are good, and there's genuine energy in the room. The problem is that the energy disappears by Monday morning. Action items don't have clear owners, or they have owners but no deadlines, or they have deadlines but nobody checks whether they were done. After a while, the team has a backlog of "things we said we'd do" that nobody acknowledges. It's not apathy. It's a follow-through system problem.`,
      plan: `<strong>Your action plan: Create a visible improvement backlog</strong>
<p><em>Step 1: Collect all outstanding retro actions</em><br/>Go through the last 3-4 retros. Pull out every action item that was agreed but never completed. Put them all in one list. This will probably be uncomfortable because the list will be long.</p>
<p><em>Step 2: Triage with the team</em><br/>Show them the list at the next retro. Ask: "Which of these still matter? Which ones are outdated? Which ones do we actually want to commit to?" Cross off everything that's no longer relevant. You'll probably cut the list in half.</p>
<p><em>Step 3: Create a dedicated "Improvements" column on your board</em><br/>Not a separate board. Not a Confluence page. A column on the board they look at every day, right next to their sprint work. Put the surviving action items there as cards, each with an owner and a target sprint.</p>
<p><em>Step 4: Review the column in standup</em><br/>Once a week (pick a day, Wednesday works well), spend 2 minutes in standup looking at the Improvements column. "Any progress? Any blockers? Anyone need help?" That's it. Two minutes. Every week.</p>`,
      results: `Within two sprints, you'll notice something interesting: the team starts treating improvement items like real work instead of "extra stuff we do if we have time." Some teams even start pulling improvement cards into their sprint commitment, which is exactly what you want. The completion rate on retro actions will go up significantly, and that in turn makes retros feel more worthwhile.`,
      watchOut: `Don't let the improvements column become a dumping ground. If it grows beyond 5-6 items, something is wrong. Either the team is committing to too much, or they're not actually working on any of it. Keep it small and active. If an item has been sitting there for 3 sprints, it either gets done this sprint or gets removed.`,
      tips: `When an improvement card gets completed, make it visible. Move it to "Done" and mention it briefly: "We said we'd do X, and we did it." This sounds basic, but teams that never celebrate completed improvements eventually stop bothering. Also, let team members pick their own improvement items to own. Forced assignment kills motivation.`
    }
  },
  "Delivery Predictability": {
    low: {
      see: `Sprint commitments are based on gut feeling or pressure from management. The team says yes to whatever goes into the sprint because saying no feels risky. Then mid-sprint, new work gets added, priorities shift, and by the end, half the sprint goal is unfinished. Nobody's surprised anymore. "We never finish everything" has become a normal thing to say. The lack of predictability isn't a team problem, it's a system problem: the inputs keep changing but the expectations don't.`,
      plan: `<strong>Your action plan: Make scope changes visible</strong>
<p><em>Step 1: Start tracking scope changes</em><br/>From the next sprint onward, every time a new item gets added to the sprint after planning, mark it. A tag, a label, a color, whatever your tool supports. The point is that you can count them at the end of the sprint.</p>
<p><em>Step 2: At sprint review, show the numbers</em><br/>"We committed to 12 items. 3 were added mid-sprint. 4 weren't finished, and 3 of those were items that got pushed down when the new ones came in." Don't editorialize. Don't blame anyone. Just show the data.</p>
<p><em>Step 3: Protect the next sprint goal</em><br/>At the next planning, agree on a simple rule with the PO: "If something new comes in mid-sprint, something of equal size comes out." Write this on a whiteboard or pin it in the team channel. When someone tries to add work, point to the rule and ask: "What should we drop to make room for this?"</p>`,
      results: `The first sprint where you track scope changes will be eye-opening. Most teams think they get "a few" additions. The actual number is usually 3-5x what they estimated. Just making this visible changes behavior. Product owners start thinking twice before adding things. The team starts feeling more in control. By sprint 3, you'll see the committed-vs-delivered gap start closing.`,
      watchOut: `Management or the PO might push back on the "something in, something out" rule. They'll say "but this is urgent" or "can't the team just absorb it?" If you cave on this, the experiment dies. The answer is: "We can absolutely do this urgent thing. Which of the current sprint items should we move to next sprint to make room?" Every time. No exceptions.`,
      tips: `Keep a simple spreadsheet: Sprint number, items committed, items added, items completed. After 4-5 sprints you'll have a chart that tells a very clear story. That chart is more powerful than any argument you can make in a meeting. Data changes minds in ways that opinions can't.`
    },
    mid: {
      see: `The team finishes most of what they commit to, maybe 60-75%, but it's inconsistent. Some sprints they nail everything, others they miss by a lot. The pattern is hard to read because nobody tracks what's causing the variance. Is it estimation? Is it scope change? Is it unplanned work? Is it one specific type of work that always takes longer? Without knowing the cause, every fix is a guess.`,
      plan: `<strong>Your action plan: Introduce cycle time tracking</strong>
<p><em>Step 1: Start measuring cycle time</em><br/>Cycle time is the number of days between when someone starts working on an item and when it's marked done. Most tools (Jira, Linear, Azure DevOps) can track this automatically. Turn it on. If your tool doesn't support it, a simple spreadsheet works: item name, date started, date finished, number of days.</p>
<p><em>Step 2: After 2-3 sprints, look at the data</em><br/>Pull the cycle times for all completed items. Sort them. You'll almost certainly see a pattern: most items take 1-3 days, but there are outliers that took 8, 10, 15 days. Those outliers are killing your predictability.</p>
<p><em>Step 3: Investigate the outliers</em><br/>For each item that took more than twice your average, ask: "What happened here?" You'll find patterns. Maybe items with unclear requirements always take longer. Maybe items touching a certain part of the codebase always get stuck. Maybe items that depend on another team always stall. Now you know what to fix.</p>
<p><em>Step 4: Set a WIP limit</em><br/>Based on your cycle time data, set a work-in-progress limit per person or per team. A good starting point: no more than 2 items in progress per developer at the same time. When someone wants to start something new, they need to finish or park something first.</p>`,
      results: `Cycle time data usually reveals that the team's estimation problem is actually a flow problem. They're not bad at estimating. They're working on too many things at once, or they're getting blocked and not resolving it fast enough. Once you add WIP limits, average cycle time drops by 20-30% within 3-4 sprints, without the team working harder or longer.`,
      watchOut: `Some people will feel micromanaged by WIP limits. Frame it carefully: "This isn't about controlling how you work. It's about making sure when you start something, you have the space to actually finish it." Also, don't set WIP limits too tight at first. Start with a limit that's just slightly below current behavior and tighten gradually.`,
      tips: `Put your average cycle time on the sprint review slide. Not as a performance metric, but as a planning tool. "Our average cycle time is 3.2 days. We have 10 working days in this sprint. With WIP limits, we can reliably commit to X items." This turns a vague sprint commitment into something backed by actual data, and it builds trust with stakeholders over time.`
    }
  },
  "Conflict Resolution": {
    low: {
      see: `There are two versions of this. Version one: someone disagrees with a decision, they don't say anything in the meeting, and then they complain about it in private or just passively resist. Version two: someone disagrees loudly, it gets personal, and the meeting ends with tension that nobody addresses. Both versions have the same root cause: the team doesn't have a shared way of handling disagreements. So every conflict feels like a crisis instead of a normal part of working together.`,
      plan: `<strong>Your action plan: Introduce a simple disagreement protocol</strong>
<p><em>Step 1: Name it</em><br/>At your next retro or team meeting, raise the topic directly: "I've noticed we sometimes struggle when we disagree on something. I want to propose a simple protocol we can try for the next few sprints."</p>
<p><em>Step 2: Share the protocol</em><br/>Write it on a whiteboard or shared doc. Three levels:<br/><br/>Level 1: Try data. "Do we have any data or evidence that supports one option over the other? Let's look at it together before we debate."<br/><br/>Level 2: Try an experiment. "We can't agree based on data alone. Let's timebox both approaches. We try option A for one sprint, measure the result, then decide."<br/><br/>Level 3: Escalate with context. "We've tried data and experimentation and still disagree. Let's bring it to [manager/architect/PO] with both options and our analysis, and let them make the call."</p>
<p><em>Step 3: Use it the first time it's needed</em><br/>The protocol only becomes real when someone actually references it. The first time a disagreement comes up, say: "Let's try our protocol. Are we at level 1, 2, or 3?" This will feel forced. That's normal. After 3-4 uses it becomes natural.</p>`,
      results: `The protocol itself isn't magic. What it does is give people permission to disagree without it being personal. When someone says "I think we're at level 1, do we have data?" they're not attacking the other person's idea. They're following a process. This small shift makes a huge difference. Within a month, you'll notice people referencing the levels on their own, sometimes even jokingly ("definitely a level 2 situation").`,
      watchOut: `Don't force this on technical debates between senior engineers who already have a healthy way of arguing. They'll resent it. This protocol is for the situations where disagreement currently leads to silence or escalation, not for the situations where it already leads to productive discussion.`,
      tips: `Print the protocol (literally, on paper) and put it on the wall near where the team sits. Or pin it in the team Slack channel. The goal is that it's always visible, so when a disagreement happens, someone can just point to it. It's much easier to reference a shared framework than to have someone play mediator every time.`
    },
    mid: {
      see: `The team can handle disagreements when they're out in the open. If two people argue about an approach in a meeting, they'll eventually find a resolution, especially if someone steps in to facilitate. The problem is the conflicts that never make it to a meeting. The friction between two people who don't communicate well. The ongoing tension about who owns which part of the codebase. The frustration with someone who always commits code at the last minute. These things simmer in the background and slowly erode trust, but nobody raises them because they're "not a big deal."`,
      plan: `<strong>Your action plan: Create a regular tension-clearing ritual</strong>
<p><em>Step 1: Add a monthly "Clearing" session</em><br/>30 minutes, once a month, separate from the retro. The prompt is simple: "Is there anything that's been bugging you about how we work together that you haven't mentioned yet?"</p>
<p><em>Step 2: Set the ground rules</em><br/>Before the first session, establish three rules: (1) everything said here stays here, (2) when someone shares, the first response is always "thank you" not a defense or explanation, (3) the goal is awareness, not immediate solutions. Some things just need to be said out loud.</p>
<p><em>Step 3: Go first</em><br/>As the facilitator, you share something first. Something genuine, not manufactured. "I've noticed I sometimes jump into conversations too quickly and don't leave enough space for others. I want to work on that." This sets the tone. If the leader is vulnerable, others follow.</p>
<p><em>Step 4: Close with commitments</em><br/>After everyone has shared (or passed, which is also fine), ask: "Is there anything here that needs a follow-up conversation between specific people?" Don't force it. Some things resolve just by being acknowledged.</p>`,
      results: `The first session will be uncomfortable. Expect long silences and surface-level observations. By the third session, people start bringing real things. The shift happens because the regularity creates safety. People know there's a dedicated space for this, so they stop ruminating on small tensions and start saving them for the clearing session. Some teams report that just having the session scheduled reduces day-to-day friction, even if the sessions themselves are short.`,
      watchOut: `Don't let the clearing session become a retro. No sticky notes, no voting, no action items on the board. This is about interpersonal dynamics, not process improvements. If it turns into "we should change how we do code reviews," redirect: "That's a great retro topic. Let's park it and keep this space for the people stuff."`,
      tips: `The monthly cadence is important. Weekly is too often (people run out of things to say and it becomes performative). Quarterly is too rare (tensions build up too much). Monthly hits the sweet spot. Also, if someone shares something particularly vulnerable, follow up with them privately after the session. A quick message: "Hey, I appreciated what you shared today. That took guts." Goes a long way.`
    }
  },
  "Stakeholder Communication": {
    low: {
      see: `All information flows through one person. Stakeholders talk to the SM or the PO, who then translates everything for the team. The team rarely hears directly from the people who use what they build. Sprint reviews have two audience members (if you're lucky), and the team presents to each other more than to anyone outside. Over time, the team loses context on why they're building what they're building, and stakeholders lose confidence in the team because they've never actually met them.`,
      plan: `<strong>Your action plan: Get team members into sprint review</strong>
<p><em>Step 1: Change who presents</em><br/>Starting next sprint review, the person who built the feature presents it. Not the SM. Not the PO. The developer or designer who did the work. Every time.</p>
<p><em>Step 2: Prepare them</em><br/>Most engineers hate presenting not because they're bad at it, but because nobody ever taught them what to say. Give them a simple template: "This is what we built. This is the problem it solves. This is how it works. Here's a quick demo." Four sentences. They can write them on a sticky note if they want.</p>
<p><em>Step 3: Invite one new stakeholder</em><br/>Each sprint review, invite one person who wouldn't normally attend. A customer support lead. A sales person. Someone from finance. Just one. Send them a personal message: "We'd love to show you what the team has been working on. 30 minutes, no preparation needed."</p>
<p><em>Step 4: Create a direct feedback loop</em><br/>After the demo, ask the stakeholder one question: "Is this useful to you? What would make it more useful?" Let the team hear the answer directly. Not filtered through the PO. Not paraphrased in a Jira comment. Direct, live, unfiltered.</p>`,
      results: `Two things happen. First, the team starts understanding why their work matters, which changes how they approach it. When a developer has personally heard a customer support lead say "this saves me 45 minutes a day," they care about quality in a different way. Second, stakeholders start trusting the team because they've seen them, talked to them, and watched them explain their own work competently. That trust is the foundation for everything else.`,
      watchOut: `Some team members will resist presenting. Don't force the shy introvert to do a 20-minute demo on their first try. Start them with something small: "Can you do a 2-minute walkthrough of just this one feature?" Build gradually. Also, make sure the PO is aligned with this approach. Some POs feel threatened when developers talk directly to stakeholders. Have that conversation privately first.`,
      tips: `Record the sprint reviews (with permission). Post the recording in the team channel. People who couldn't attend can watch later, and the team gets to see themselves presenting, which builds confidence over time. Also, after each review, ask the presenter: "How did that feel? What would you do differently next time?" Brief, casual, supportive.`
    },
    mid: {
      see: `The team handles routine communication fine. They can present in sprint reviews, answer questions about their work, and have basic conversations with stakeholders. But the moment something gets complicated, like pushing back on a deadline, negotiating scope, or explaining why something is taking longer than expected, they defer to the SM or the PO. "I'll let [SM name] handle that" becomes the default for any conversation that involves tension or politics. The team can talk about their work, but they can't yet advocate for their work.`,
      plan: `<strong>Your action plan: Pair team members with stakeholders on specific topics</strong>
<p><em>Step 1: Identify recurring stakeholder touchpoints</em><br/>Make a list of every regular interaction between the team and stakeholders: sprint reviews, backlog grooming, ad-hoc requirement clarifications, bug triage meetings, status updates, etc. You'll probably find 5-8 regular touchpoints.</p>
<p><em>Step 2: Assign ownership</em><br/>For each touchpoint, assign a team member as the primary contact. Not the SM, not the PO, a team member. The developer who works on the payment module owns the relationship with the payment stakeholder. The person who works on the mobile app owns the relationship with the mobile product manager. Make it explicit and write it down.</p>
<p><em>Step 3: Coach the first difficult conversation</em><br/>When the first tricky conversation comes up (and it will), don't take it over. Instead, prep the team member: "Here's what the stakeholder is likely to say. Here are the facts you need. Here's a way to frame the pushback that won't create conflict." Then let them do it. Be available for backup but don't jump in unless they explicitly ask.</p>
<p><em>Step 4: Debrief after</em><br/>After the conversation, ask: "How did it go? What surprised you? What would you do differently?" This is where real learning happens. Not in a training session about communication skills, but in the 5-minute debrief after a real conversation.</p>`,
      results: `Within a month, you'll notice something subtle: stakeholders start contacting team members directly instead of going through you. This feels like losing control, but it's actually the goal. It means stakeholders trust the team enough to talk to them without a translator. Your role shifts from "communication hub" to "coach on the sideline," which is exactly where it should be.`,
      watchOut: `Some team members will over-commit when talking to stakeholders directly. A stakeholder says "can you just add this small thing?" and the team member says yes before thinking about the sprint impact. Coach them on a simple phrase: "That sounds doable. Let me check with the team on timing and get back to you today." It buys time without creating friction.`,
      tips: `Create a shared doc with a "Stakeholder Map." Each team member's name, which stakeholders they own, and any important context (communication preferences, hot topics, relationship history). Update it every sprint. This becomes the team's reference for "who talks to who about what" and prevents the SM from being the single point of contact by default.`
    }
  },
  "Ownership & Accountability": {
    low: {
      see: `The team works on tickets. They pick up a card, do the work, move it to done. If the feature doesn't work for the end user, or if the sprint goal isn't met, or if the release has bugs, that's someone else's problem. Not because the team doesn't care, but because nobody ever asked them to care about the outcome. They were asked to care about the output. "Did you finish your ticket?" is a different question than "Did we deliver something valuable?" The team has been trained to think in tasks, not in outcomes.`,
      plan: `<strong>Your action plan: Involve the team in defining the sprint goal</strong>
<p><em>Step 1: Stop writing the sprint goal yourself</em><br/>In the next planning session, don't come in with a pre-written sprint goal. Instead, after reviewing the backlog items for the sprint, ask the team: "Based on what we've planned, how would you describe what we're trying to achieve this sprint? In one sentence."</p>
<p><em>Step 2: Let them struggle with it</em><br/>The first time you do this, there will be silence. Or someone will say something vague like "finish the tickets." That's fine. Push a little: "If our stakeholder asks us on Friday 'what did the team accomplish this sprint,' what do we want the answer to be?" This forces outcome thinking.</p>
<p><em>Step 3: Write it where everyone can see it</em><br/>Whatever they come up with, put it at the top of the board. Not in a Confluence page. Not in the sprint planning notes. On the board. In big letters. So every day when someone looks at the board they see it.</p>
<p><em>Step 4: Reference it mid-sprint</em><br/>On Wednesday or Thursday, take 2 minutes in standup: "Quick check, are we still on track for our sprint goal?" This is different from "are your tickets on track?" It shifts the conversation from individual tasks to collective outcome. If the answer is "no," the team has to figure out what to do about it together.</p>`,
      results: `The first few sprints will produce generic sprint goals. "Complete the user stories" or something equally useless. That's fine. By sprint 3 or 4, the goals start getting specific and meaningful: "Ship the checkout redesign and get it in front of 100 beta users." When the team starts writing goals like that, they've started caring about outcomes. You'll also notice team members making different decisions during the sprint, like helping a colleague finish a feature instead of starting a new one, because they're optimizing for the goal, not for their personal throughput.`,
      watchOut: `The PO might resist letting the team define the sprint goal. They might say "that's my job." It's not about who writes it, it's about who owns it. Suggest a compromise: the PO proposes a direction ("I think this sprint should focus on checkout improvements"), the team turns it into a specific, achievable goal. Both parties contribute.`,
      tips: `At the end of each sprint, ask one question: "Did we achieve our sprint goal? Yes or no." Not "did we finish all the tickets." The sprint goal. If the answer is "we finished 90% of tickets but didn't meet the goal," that's a failed sprint, and it's a valuable conversation. If the answer is "we met the goal but only finished 70% of tickets," that might actually be a success. This distinction is where ownership starts.`
    },
    mid: {
      see: `There are usually 2-3 people on the team who run things. They volunteer for the hard tasks, they drive the retro, they speak up in planning, they follow up on blockers. The rest of the team is perfectly competent but passive. They do good work when it's assigned, but they don't initiate. They don't flag problems. They don't propose improvements. It's not laziness. It's a dynamic that formed over time: the proactive people kept stepping up, which meant the others never needed to, which meant the proactive people stepped up even more. Classic reinforcing loop.`,
      plan: `<strong>Your action plan: Distribute leadership deliberately</strong>
<p><em>Step 1: List everything the SM or team lead currently owns</em><br/>Standup facilitation. Retro facilitation. Sprint review preparation. Board hygiene. Blocker follow-up. Dependency coordination. Metrics tracking. Write it all down. You'll probably find 8-12 things.</p>
<p><em>Step 2: Transfer one per sprint</em><br/>Pick the easiest one first (board hygiene or standup facilitation usually work well). In the next sprint, explicitly hand it to someone who doesn't usually take initiative. Not as a request. As an assignment: "This sprint, [name] is responsible for keeping the board clean. That means every card has the right status, no stale items, WIP limits respected."</p>
<p><em>Step 3: Make it real</em><br/>Don't just assign it and forget. Check in mid-sprint: "How's the board hygiene going? Need anything from me?" And at the end of the sprint: "How was it owning the board this sprint? What did you notice that you wouldn't have noticed otherwise?"</p>
<p><em>Step 4: Rotate and expand</em><br/>Next sprint, keep that assignment or rotate to someone else, and add another one. Within 4-5 sprints, every team member owns something beyond their individual tickets.</p>`,
      results: `Something interesting happens when people own a process: they start seeing the system. The person who owns board hygiene starts noticing bottlenecks. The person who owns blocker follow-up starts understanding cross-team dependencies. This broader awareness is exactly what's been missing from the passive members. They weren't disengaged. They just never had a reason to look beyond their own lane.`,
      watchOut: `The proactive people might feel threatened or frustrated. "Why are you giving my thing to someone who won't do it as well?" Talk to them directly: "You've been carrying a lot. This isn't about replacing you. It's about building the team's capacity so you're not the single point of failure." Most proactive people are actually relieved when someone else shares the load, even if they don't admit it at first.`,
      tips: `Start a "Team Ownership Map." A simple grid: rows are team members, columns are areas of responsibility. Put a name in each cell. Update it every sprint. Two things happen: quiet people see their name on the board and feel accountable, and the proactive people see that they don't need to carry everything. Make the map visible (on the wall or pinned in the team channel), not hidden in a doc.`
    }
  },
  "Psychological Safety": {
    low: {
      see: `You can spot low psychological safety by what people don't do. Nobody asks "stupid" questions in meetings. Nobody admits they don't understand a requirement. Nobody pushes back on the tech lead's approach. Nobody says "I made a mistake" unless they're forced to by a bug in production. Standups become status reports: "I worked on X, I'll work on Y, no blockers." Even when there are obviously blockers. The team has learned that the safest behavior is to stay invisible, do your work, and never be the person who breaks something or slows things down.`,
      plan: `<strong>Your action plan: Start with leadership vulnerability</strong>
<p><em>Step 1: Model the behavior you want</em><br/>This one's on you. At the next standup or team meeting, share something you got wrong. Something real, not manufactured. "I misread the priority on that backlog item last sprint and it cost us a day. My mistake." Or: "I should have flagged that dependency earlier. I dropped the ball." You go first. Every time.</p>
<p><em>Step 2: Change how you respond to mistakes</em><br/>The next time someone breaks something, makes a wrong call, or admits they're stuck, your response sets the tone for the entire team. Before anything else, say: "Thanks for flagging that." Not "how did this happen?" Not "who approved this?" Just a simple acknowledgment that telling the truth was the right thing to do. Then move to solving the problem.</p>
<p><em>Step 3: Run a blameless post-mortem</em><br/>The next time something goes wrong in production or a sprint goes badly, run a session with one rule: "We're here to understand what happened in the system, not who did what wrong." Focus the conversation on process gaps, unclear requirements, missing tests, broken communication. Every time someone starts pointing at a person, redirect: "That's a person. What's the system failure that let this happen?"</p>
<p><em>Step 4: Make a small, visible change based on what you learn</em><br/>After the post-mortem, implement one thing. One. "We now require a second reviewer on any PR touching the payment module." This shows the team that talking about mistakes leads to better systems, not punishment.</p>`,
      results: `Psychological safety doesn't flip like a switch. It builds slowly. After 3-4 weeks of consistently modeling vulnerability and responding well to mistakes, you'll start seeing small changes. Someone asks a clarifying question in planning that they would have kept to themselves before. Someone admits in standup that they're stuck. Someone pushes back on an approach they disagree with. These are tiny moments, but they're signals that the environment is shifting.`,
      watchOut: `The biggest risk is inconsistency. If you model vulnerability on Monday and then react badly to a mistake on Wednesday, you've undone a month of progress. Safety is built in drops and lost in buckets. Also, watch for sarcasm. A "well, that was an interesting choice" after a mistake might seem harmless but it kills safety instantly.`,
      tips: `Keep a private note of "safety signals" you observe each week. Someone asked a hard question. Someone admitted a mistake. Someone disagreed publicly. Track these. You'll start seeing patterns. If the signals increase over time, you're on the right track. If they stall, look at what happened that week. There's almost always a specific moment that shut things down, and it's usually something you or another leader said without thinking.`
    },
    mid: {
      see: `In normal conditions, the team communicates well. People share ideas, ask questions, and collaborate openly. But when a deadline gets tight, when a production incident happens, or when a senior person has a strong opinion, the dynamic changes. People go quiet. They defer instead of debating. They nod in meetings and then complain in DMs. The safety is conditional. It exists when things are calm and disappears when things get tense. This means it's not yet real safety. Real safety holds under pressure.`,
      plan: `<strong>Your action plan: Identify and address the specific pressure points</strong>
<p><em>Step 1: Map when safety breaks down</em><br/>Over the next two weeks, pay attention to the moments when the team goes quiet or defers. Write them down privately. What was happening? Who was in the room? What was the topic? Was there a deadline involved? You're looking for patterns, not incidents.</p>
<p><em>Step 2: Address the most common pattern</em><br/>You'll probably find 1-2 recurring triggers. Common ones: a senior engineer who dismisses ideas, a manager who asks "why isn't this done yet?" in standup, or a general anxiety spike when production issues happen. Pick the most impactful one.</p>
<p><em>Step 3: Have a private conversation</em><br/>If the trigger is a specific person, talk to them 1-on-1. Don't accuse. Describe what you observed: "I've noticed that when you share a strong opinion in planning, the rest of the team tends to stop contributing. I don't think you're doing it intentionally, and your input is valuable. Could we try something? When you have a strong view, could you share it last instead of first? Give others a chance to weigh in before you anchor the discussion."</p>
<p><em>Step 4: Create a structural safeguard</em><br/>For pressure situations, add a simple ritual: before any high-stakes decision, everyone writes their opinion on a sticky note (physical or digital) before the discussion starts. This prevents anchoring and gives quieter people an equal voice. It takes 60 seconds and changes the dynamic completely.</p>`,
      results: `When you address the specific trigger, the improvement is usually rapid. People notice immediately when the dominating voice gives them space, or when the stressful meeting gets a structural change. Within 2-3 weeks, you'll see participation increase in exactly the contexts where it used to drop. The team won't necessarily mention it. They'll just start talking more.`,
      watchOut: `The private conversation with a dominant team member can backfire if done poorly. Don't make them feel like they're the problem. Frame it as: "Your input is some of the most valuable in the room. I want to make sure it doesn't accidentally crowd out other perspectives that could be equally valuable." Most senior people respond well to this framing because it affirms their expertise while asking for a small behavioral change.`,
      tips: `Anonymous input works better than you'd expect. For retros or brainstorming in a team with fragile safety, use a tool like Miro or FigJam where everyone can add notes anonymously. Yes, it's a crutch. Yes, ideally people should feel safe speaking up. But the crutch works, and it buys you time to build real safety. After a few rounds of seeing that their anonymous input is valued and acted on, people start putting their name on it.`
    }
  },
  "Technical Practices": {
    low: {
      see: `Deployments are stressful events. They happen at odd hours, involve multiple people, and everyone holds their breath until it's confirmed working. There's little or no automated testing, so bugs are found by manual QA (if you're lucky) or by users in production (if you're not). The codebase has accumulated years of quick fixes and workarounds that nobody wants to touch. Developers know which files to avoid. "Don't touch that module" is a phrase that gets said out loud. New features take longer and longer because every change risks breaking something unexpected.`,
      plan: `<strong>Your action plan: Build the foundation, one piece at a time</strong>
<p><em>Step 1: Automate the build pipeline</em><br/>If you don't have a CI pipeline that automatically builds and runs whatever tests exist when someone opens a pull request, start here. This is step zero. Everything else builds on it. Use whatever your org has available (Jenkins, GitHub Actions, GitLab CI, Azure DevOps). The first version just needs to: pull the code, build it, and run existing tests. That's it.</p>
<p><em>Step 2: Add tests to the 3 riskiest areas</em><br/>Don't try to achieve comprehensive test coverage. Instead, ask the team: "If you could only test three things, which three areas scare you the most when you change them?" Write tests for those. Integration tests are usually more valuable than unit tests here because they catch the kind of cross-module breaks that cause production incidents.</p>
<p><em>Step 3: Create a tech debt register</em><br/>Make a list of the top 10 tech debt items. Not in a backlog that gets ignored. In a visible register that gets reviewed monthly. For each item, note: what's the risk if we don't fix it, what's the estimated effort, and what's the business impact. This gives you ammunition when you need to justify spending time on tech debt.</p>
<p><em>Step 4: Allocate a fixed percentage to tech debt</em><br/>Negotiate with the PO: 15-20% of sprint capacity goes to tech debt. Every sprint. Non-negotiable. It's not "if we have time." It's budgeted, planned, and visible. The team picks the highest-impact item from the register and works on it alongside feature work.</p>`,
      results: `After 2-3 sprints with a CI pipeline and basic test coverage, the team's fear of deploying starts to decrease. Not because everything is tested, but because they now have a safety net that catches the most dangerous mistakes. After a few months of consistent tech debt work, the codebase starts feeling manageable again. Developers stop avoiding certain files. Feature velocity actually increases because the foundation is more stable.`,
      watchOut: `The PO or management might resist the 20% tech debt allocation. "We have features to ship." The counterargument: "Every sprint we spend 30% of our time dealing with bugs and rework caused by tech debt. If we invest 20% now, we get that 30% back within a quarter." Use your bug rate and rework data to make this case. If you don't have that data, start tracking it now.`,
      tips: `Celebrate the first successful automated deployment. Seriously. When the team sees code go from PR to production without a 3-hour manual process, the mood shifts. People start believing that things can actually get better. That belief matters more than any specific technical practice because it's what drives the team to keep investing in quality.`
    },
    mid: {
      see: `The team has a CI pipeline, some test coverage, and a deployment process that mostly works. But it's patchy. The core module has solid tests but the integrations have none. Two developers do thorough code reviews while three others rubber-stamp PRs. The deployment process works when everything goes well but there's no clear rollback plan when it doesn't. Knowledge is concentrated in a few people who have been there the longest. If they're on vacation, deployments get postponed and hard technical decisions wait.`,
      plan: `<strong>Your action plan: Standardize and distribute knowledge</strong>
<p><em>Step 1: Define "Done" for real</em><br/>Work with the team to create a concrete Definition of Done that includes technical criteria. Not just "feature works." Something like: "Code reviewed by at least one person who didn't write it. Integration tests pass. No new critical or high-severity linting warnings. Documentation updated if the change affects an API or configuration." Write it down. Print it. Put it next to the board.</p>
<p><em>Step 2: Start pair programming on risky areas</em><br/>Identify the parts of the codebase where only one person knows what's going on (the bus factor 1 areas). Schedule regular pairing sessions: the expert works on a task in that area alongside someone who doesn't know it well. Not a knowledge transfer meeting. Actual pair programming on real work. Once a week, 2-3 hours.</p>
<p><em>Step 3: Improve code review quality</em><br/>Set a minimum bar for code reviews: every review must include at least one question or suggestion. Not a "LGTM." An actual piece of feedback. This forces reviewers to actually read the code. It slows things down slightly at first but catches problems before they reach production.</p>
<p><em>Step 4: Document the deployment process</em><br/>Write down every step of a deployment, including what to do when something goes wrong. Rollback steps. Who to contact. How to verify that the deployment worked. Make this a living document and update it every time the process changes. Then have someone who's never deployed follow the document step by step. Every place they get stuck is a gap in the documentation.</p>`,
      results: `Within a month, code review quality improves noticeably. Reviews start catching real bugs instead of just formatting issues. Within 2-3 months, the pairing sessions start paying off: at least one more person can confidently work in each critical area. Deployments become less stressful because there's a documented rollback plan and more people can execute it. The overall effect is that the team's technical confidence goes up, and with it, their willingness to tackle harder problems.`,
      watchOut: `The biggest resistance will be to pair programming. Developers often feel it's inefficient ("two people doing one person's job"). Frame it as risk management, not training: "If [expert name] is unavailable and we need an emergency fix in that module, can anyone else do it? No? That's a risk we need to mitigate." Most teams accept pairing when it's framed as reducing organizational risk rather than upskilling individuals.`,
      tips: `Track your bus factor per module. A simple spreadsheet: module name, who can work on it confidently. If any row has only one name, that's a priority for pairing. Review the spreadsheet monthly with the team. It makes the knowledge distribution problem visible and measurable, and it gives you a clear target: every module should have at least two names.`
    }
  }
};

function getLevel(pct) {
  if (pct >= 75) return "high";
  if (pct >= 50) return "mid";
  return "low";
}

function buildEmailHtml(scores, overallPct, verdict) {
  // Sort categories by score ascending, take top 3 weakest
  const sorted = [...scores].sort((a, b) => a.pct - b.pct);
  const weakest = sorted.filter(s => s.pct < 75).slice(0, 3);

  const categoryHtml = weakest.map(cat => {
    const level = getLevel(cat.pct);
    const texts = emailTexts[cat.category]?.[level];
    if (!texts) return "";

    return `
      <div style="margin-bottom: 40px; padding: 24px; background: #f8fafc; border-radius: 12px; border-left: 4px solid ${cat.pct < 50 ? '#ef4444' : '#f59e0b'};">
        <h2 style="font-family: Georgia, serif; font-size: 20px; color: #0f172a; margin: 0 0 4px 0;">${cat.icon} ${cat.category}</h2>
        <p style="font-size: 14px; color: ${cat.pct < 50 ? '#ef4444' : '#f59e0b'}; font-weight: 600; margin: 0 0 16px 0;">Score: ${cat.pct}%</p>
        
        <h3 style="font-size: 15px; color: #334155; margin: 0 0 8px 0;">What we usually see</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 20px 0;">${texts.see}</p>
        
        <div style="margin-bottom: 20px;">${texts.plan}</div>
        
        <h3 style="font-size: 15px; color: #334155; margin: 0 0 8px 0;">Expected results</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 20px 0;">${texts.results}</p>
        
        <h3 style="font-size: 15px; color: #334155; margin: 0 0 8px 0;">Watch out for</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0 0 20px 0;">${texts.watchOut}</p>
        
        <h3 style="font-size: 15px; color: #334155; margin: 0 0 8px 0;">Tips</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.7; margin: 0;">${texts.tips}</p>
      </div>
    `;
  }).join("");

  const strongCategories = sorted.filter(s => s.pct >= 75).map(s => `${s.icon} ${s.category} (${s.pct}%)`).join(", ");

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background: #ffffff; color: #0f172a;">
      
      <div style="text-align: center; padding: 32px 0; border-bottom: 1px solid #e2e8f0;">
        <h1 style="font-family: Georgia, serif; font-size: 26px; font-weight: 800; margin: 0 0 8px 0;">Your Team Maturity Results</h1>
        <p style="font-size: 16px; color: #64748b; margin: 0;">Overall Score: <strong style="color: ${overallPct >= 75 ? '#059669' : overallPct >= 50 ? '#d97706' : '#dc2626'}; font-size: 20px;">${overallPct}%</strong></p>
        <p style="font-size: 14px; color: #94a3b8; margin: 8px 0 0 0;">${verdict}</p>
      </div>

      ${strongCategories ? `
        <div style="padding: 20px 0; border-bottom: 1px solid #e2e8f0;">
          <p style="font-size: 14px; color: #475569; margin: 0;"><strong>Your strengths:</strong> ${strongCategories}</p>
        </div>
      ` : ""}

      <div style="padding: 32px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 20px; color: #0f172a; margin: 0 0 8px 0;">Where focused work could make a big difference</h2>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 24px 0;">Based on your scores, here are your top ${weakest.length} areas with specific action plans you can start this week.</p>
        ${categoryHtml}
      </div>

      <div style="text-align: center; padding: 32px; background: #0f172a; border-radius: 12px; margin-bottom: 32px;">
        <h2 style="font-family: Georgia, serif; color: #f8fafc; font-size: 20px; margin: 0 0 8px 0;">Want to talk through these in detail?</h2>
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">Book a free 20-minute diagnostic call with us.</p>
        <a href="https://hillgliga.com" style="display: inline-block; padding: 14px 32px; background: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Book a Free Consultation</a>
      </div>

      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">Hill + Gliga · Agile & Engineering Advisory</p>
        <p style="font-size: 11px; color: #cbd5e1; margin: 4px 0 0 0;">You received this because you completed our Team Maturity Assessment.</p>
      </div>
    </body>
    </html>
  `;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, scores, overallPct, verdict } = req.body;

    if (!email || !scores || !overallPct) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const html = buildEmailHtml(scores, overallPct, verdict);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: `Your Team Maturity Results: ${overallPct}% Overall Score`,
        html: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      return res.status(500).json({ error: "Failed to send email", details: data });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
