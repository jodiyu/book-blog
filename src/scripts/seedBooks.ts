// populates the database with all the books 

import 'dotenv/config';
import { config } from 'dotenv';

// make sure environment variables are loaded
config({ path: '.env.local' }); 

import { db } from "@/lib/db";
import { books } from "@/db/schema";
import { uploadImageToS3 } from "@/lib/s3";

// debugging: checking DATABASE_URL
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...'); // avoid logging entire URL

// seed data
const seedData = [
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    quote: "They won't let me .. I can't be .. good.",
    review: "The Underground Man is an unreliable narrator who acts with an overly acute consciousness that torments him into a state of paralysis. He is incredibly spiteful towards the “cruel laws of nature” and the arbitrary, immovable external world. Through his spitefulness, he expresses a painful autonomy, almost choosing the miserable path just to prove he has the choice to do so. He makes the distinction between himself and “men of action,” or men who mistake walls as moral signs and conflate self-imposed justice with universal meaning. He evokes disbelief, pity, contempt, and self reflection: Do we have this inherent, predisposed quality to remain eternally dissatisfied, no matter what perfect utopia or Glass Palace enshrines us? How much do we control our own outcome, the meaning and legacy of our existence? Perhaps we all beat our fist against a stone wall, deriving a masochistic pleasure from the pain, just to prove we still have a semblance of choice.",
    coverPath: "./src/assets/Notes_From_Underground.jpg"
  },
  {
    title: "The Handmaid’s Tale",
    author: "Margaret Atwood",
    quote: "I consider these things idly. Each one of them seems the same size as all the others. Not one seems preferable. Fatigue is here, in my body, in my legs and eyes. That is what you get in the end. Faith is only a word, embroidered. ",
    review: "In the Gileadean government, sexist ideals and distorted religious values run rampant, dehumanizing women and reducing them to their reproductive capacity. What struck me most was the main character’s complacency. As the reader, you want Offred to resist the oppressive regime and to seize power in such a bold and destructive way. Yet, she sits in her room, mulling over the word faith embroidered on her pillow, rebelling silently and exerting her will in the smallest ways. Do her imagined rebellions even matter? Does she not lose parts of herself from her actionable inaction? It is frustrating as readers, but perhaps we wrongfully judge her. Perhaps she is a reflection of the best of us in the worst circumstances, failing to rise up, to boldly rebel, to bravely advocate for the rights and campaign against the wrongs. For, we are only the bravest in our heads, in the comfort of our minds, stuffed with imagined, noble thoughts and nothing else. It’s a story with no resolve; you slowly watch as parts of her are torn away by her inaction, as her world disintegrates before her eyes. As Offred finishes her narration, she speaks to the audience, saying, “I believe you into being.” It is an acknowledgement that she is speaking without knowing who is listening, whether it be a captive audience or no one at all. She takes hold of her narrative nevertheless, seizing the power to be heard, to bear meaning, to matter. Offred ultimately tells her story and wills it to matter, and so it does. We must find ways to be heard, even if no one listens, and we must find ways to hope, even in impossible circumstances.",
    coverPath: "./src/assets/The_Handmaids_Tale.jpg"
  },
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    quote: "Kaladin being a wretch quote",
    review: "When difficult times fall onto us, we yearn for some external sign of our grievances because we cannot bear to acknowledge the knife that stabs us was held by our own hand.",
    coverPath: "./src/assets/The_Way_Of_Kings.jpg"
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    quote: "But it is even so; the fallen angel becomes a malignant devil. Yet even that enemy of God and man had friends and associates in his desolation; I am quite alone.",
    review: "Frankenstein discovers a way to create life, and in a “fit of enthusiastic madness,” creates a nameless being made out of dead human parts. Such brilliant writing, poignantly describing the tragic unfolding of events. It is utterly confounding to learn the perspectives of such complex characters; like light refracting through different lenses. The dæmon, burdened with a humanity forever unacknowledged, performs terrible and malicious acts onto those whom Frankenstein loves. It is utterly terrifying to watch all these tragedies unfold: to bear witness to the disintegration of Frankenstein’s life, as he slowly loses everything. It is more terrifying to be stricken with empathy for the wretched being responsible. One can also draw parallels between the book and modern day in the theme of skepticism towards unchecked innovation. Brilliant yet dangerous, delirious with an academic fervor that blinds us of consequences that don’t become apparent until they are irreversible. ",
    coverPath: "./src/assets/Frankenstein.jpg"
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    quote: "I don’t know what’s wrong with me, says Marianne. I don’t know why I can’t be like normal people",
    review: "This story follows two characters Marianne and Connell and their complex relationship through time. I question how love is defined and portrayed between the two: Is their love inextricably bound to the characters’ internal pain: Marianne’s proclivity towards getting hurt and Connell’s desperation for conformity? What is their love without their unequal power dynamic? The story is beautiful in its incompleteness and its non-formulaic structure, jumping through time like there exists no linearity and cohesion. As readers, we are mere observers, momentarily immersed in their lives and then exiting promptly, while the characters live on without us. It is reminiscent of memories: some stick and permeate in your consciousness, and you live in them like they are slow and unending. Other periods of your life evade your mind without more than a whisper. In the end, there is no satisfying close to their story. We are left grasping for some sense of the future, wondering if they will continue to find each other, or if they will eventually fade from each others’ lives like old memories. We also question what it means to be “normal.” We see Marianne and Connell categorized as “not normal” from their internalized debates, nagging thoughts, and inner resentment. And while the internal feels crippled and mutilated, the external appears shiny and unscathed to the outside observer. It begs the question if we are all just outsiders struggling under the guise of “normal people.”",
    coverPath: "./src/assets/Normal_People.jpg"
  },
  {
    title: "Reading with Patrick",
    author: "Michelle Kuo",
    quote: "For Ammongs, of all the places in the world, the place where his brother died is the dearest and the worst to him. He cannot leave this place. Here he must stand and fail. Does everybody have such a moment, a juncture or place to which they return to which they say, Come back to life, so that we go on with our lives, sustaining our shadow selves, spirit-beings who talk to us and also punish us? Here is my life that did not become, a place to which I return and return…",
    review: "A wildly important story to read, mull over, and grapple with how we choose to live and what we leave behind. Beautifully written and articulated, Kuo relays her journey in education and the friendship she built over time with one of her students, Patrick. What I found most striking was her internalized debates over the decisions she made: her self doubt, shame, and guilt. It is beautifully destructive, like diminished hope; the terrible nagging in the back of the mind as we return to the juncture, and we stare at all the paths we did not take. It is cruel that only after we leave a moment, we realize its significance. It is paradoxical too: Kuo says it would be boastful to assert that she could single handedly change Patrick’s fate, while it would be dismissive to cast away her guilt over leaving him. But we should not think in black and white, and in this gray landscape, we find hope in our connection to others and in leaving lasting impressions in each others’ lives.",
    coverPath: "./src/assets/Reading_With_Patrick.jpg"
  },
   {
    title: "Looking for Alaska",
    author: "John Green",
    quote: "But not-knowing would not keep me from not caring, and I would always love Alaska Young, my crooked neighbor, with all my crooked heart",
    review: "The book is about the teenager Miles Halter who memorizes people’s last words and goes to boarding school to seek “The Great Perhaps.” There are so many great themes in this book: searching for meaning and seeking the Great Perhaps, closure in an unanswerable world, the labyrinth of suffering, and how we romanticize people and turn them into vessels to stuff our dreams into. I obsess over the metaphor of the labyrinth, running through it and frantically searching for some definitive ending. Green writes, “the pleasure is in the seeking,” so perhaps it is not fruitless searching, but hopeful seeking. There is pain in the unanswered, but there is hope too.",
    coverPath: "./src/assets/Looking_For_Alaska.jpg"
  },
  {
    title: "Tress of the Emerald Sea",
    author: "Brandon Sanderson",
    quote: "Memories are fossils, the bones left by dead versions of ourselves. More potently, our minds are a hungry audience, craving only the peaks and valleys of experience. The bland erodes, leaving behind the distinctive bits to be remembered again and again. ",
    review: "The book is a thrilling hero’s journey set in a world of spore oceans, cups, and pirates. Sanderson is able to convey feelings and events in such creative ways, my favorite description is love as a pair of gloves. Tress is a beautifully written protagonist, and the narrator of the story, Hoid, is hilariously witty. I often find myself recalling the narrator’s commentary on memories: How we memorialize our old selves, creating giants and legends of the past, our memories shifting and changing as we do. This makes me wonder what I have unknowingly forgotten or subconsciously rewritten. Perhaps we take a memory, stretch it out, contort it, and replay it until we become a legend, like a usurper to a nonexistent kingdom. ",
    coverPath: "./src/assets/Tress.jpg"
  },
  {
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    quote: "Everything is indeed permitted if God does not exist, and man is in consequence forlorn for he cannot find anything to depend upon either within or outside himself. He discovers forthwith, that he is without excuse.",
    review: "According to Sartre, essence does not precede existence and thus, man is condemned to be free. In a state of realizing the burden of freedom pushed onto him, he experiences anguish, performing actions as examples with no basis except himself. For, how can he decipher the lulls of inauthenticity, the gentle whispers of an angel, the Devil festering in his soul, or societally imposed standards that permeate through his subconscious, compelling him to act? Every decision from God is thus a decision from man to interpret it as God; man is the ultimate interpreter of nature and the ultimate decider of his own action. Sartre further claims that there is value because there is choice. We are like artists: we scribble lines onto a blank canvas and declare them shapes, mix paint to create color, and add light, changing the painting’s focus and purpose. There is no ultimate conception to what the picture ought to be: morality is unestablished and can shift and transform throughout our lives. Man defines his own morality and thus, man makes himself. Perhaps there is no sun outside the cave; we all must decipher our own impulses, deciding their merit based on nothing but ourselves. An existence that precedes essence is terrifying, but enthralling. For, we are radically free, and there exists a liberating notion in subjectively defining and interpreting the world. So, we exit the cave and plunge into darkness, not for the sun, but for ourselves. .",
    coverPath: "./src/assets/Existentialism.jpg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    quote: "You shall not, for the sake of one individual, change the meaning of principle and integrity, nor endeavor to persuade yourself or me, that selfishness is prudence, and insensibility of danger, security for happiness.",
    coverPath: "./src/assets/Pride_And_Prejudice.jpg"
  },
  {
    title: "The Death of Ivan Illyich",
    author: "Leo Tolstoy",
    quote: "'Where is it? What death?' There was no fear because there was no death either. In place of death there was light. 'So that's what it is!’ he suddenly exclaimed aloud. 'What joy!'",
    review: "Ivan Illych lives an inauthentic life, consumed by his “theyself” identity. He carries himself with utmost decency and dignity, living for the constant promotion of a pleasant and decorous life. He mimics and molds himself to the standards of others, quelling imperceptible impulses that he later realizes are glimpses of his true self. There is pain in illness, but there is greater pain in people’s lack of understanding of the illness. The people in Illyich’s life - his wife, the doctors, his children - are unable to acknowledge death in their lives because they are unwilling to confront their own mortality. To them, the terrible act of his dying dampers their decorous lifestyles and bubbles of artificial happiness, so they devalue it. Ilyich thus becomes tormented by their lies: their play acting, their diseased hope, and their suffocating shields and screens that hide meaningful life and inevitable death. In the final chapter, Ilyich releases his family and himself from suffering, remarking death as light. In comparing death to light, two starkly contrastive terms, we grapple with how death is often perceived and how artificial life is no life at all.",
    coverPath: "./src/assets/Existentialism.jpg"
  },
   {
    title: "The End of Your Life Book Club",
    author: "Will Schwalbe",
    quote: "There are always people who want to share their stories with you, to tell you about their lives and families and dreams and plans",
    coverPath: "./src/assets/The_End.jpg"
  },
  {
    title: "Between Two Kingdoms",
    author: "Suleika Jaouad",
    quote: "Moving on. It’s a phrase I obsess over: what it means, what it doesn’t, how to do it for real. It seemed so easy at first, too easy, and it’s starting to dawn on me that moving on is a myth – a lie you sell yourself when your life has become unendurable. It’s the delusion that you can build a barricade between yourself and your past – that you can ignore your pain, that you can bury your great love with a new relationship, that you are among the lucky few who get to skip over the hard work of grieving and healing and rebuilding– and that all this, when it catches up to you, won’t come for blood.",
    review: "This book changed my perspective in trying to create discrete starts and stops in life. Jaouad beautifully conveys the complexity in existing in a gray landscape, between two kingdoms.",
    coverPath: "./src/assets/Between_Two_Kingdoms.jpg"
  },
];

async function seedBooks() {
  try {
    console.log('Starting seed process...'); // debugging message
    
    for (const book of seedData) { // for each object in the array
      const exists = await db.query.books.findFirst({ // returns true if the book already exists in the database
        where: (b, { eq }) => eq(b.title, book.title),
      });

      if (!exists) { // if it doesn't exist, insert the book in the database
        const coverUrl = await uploadImageToS3(book.coverPath); // upload image to S3 and get the URL to insert into the database
        await db.insert(books).values({
          title: book.title,
          author: book.author,
          quote: book.quote,
          review: book.review,
          cover: coverUrl,
        });
        console.log(`Inserted: ${book.title}`);
      } else {
        console.log(`Skipped: ${book.title}`);
      }
    }
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedBooks();
