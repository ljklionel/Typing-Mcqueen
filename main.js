// All the starting variables 
const thirty = document.querySelector(".thirty");
const sixty = document.querySelector(".sixty");
const easy = document.querySelector(".easy");
const hard = document.querySelector(".hard");
const test = document.querySelector(".words");
const refresh = document.querySelector(".refresh");
const cursor = document.querySelector(".cursor");
const timer = document.getElementsByClassName("timer");
const textArea = document.querySelector(".text-area");
const errorDisplay = document.querySelector(".errors-count");
const accuracyDisplay = document.querySelector(".accuracy-count");
const wpmDisplay = document.querySelector(".wpm-count");

let wordArr = [];
let countdown = timer[0].innerHTML;
let interval = null;
let currentWord = null;
let wrongLetter = 0;
let index = 0;
let width = 0;
let first = 1;
let prevLast = null;

// metrics
let totalErrors = 0;
let typedLetters = 0;
let totalWrongLetters = 0;

//if wan stop animation of hte ticking cursor & get the floating value of the last word? force the number of characters that can be added as a child(bops) add explanation
localStorage.setItem("30", 0);
localStorage.setItem("easy", 0);
localStorage.setItem("start", 0);

// async read of local files is not possible as this is a static webpage without a server, so manually copy paste the words here
const easyWords = ["abandon", "ability", "able", "abortion", "about", "above", "abroad", "absence", "absolute", "absolutely", "absorb", "abuse", "academic", "accept", "access", "accident", "accompany", "accomplish", "according", "account", "accurate", "accuse", "achieve", "achievement", "acid", "acknowledge", "acquire", "across", "act", "action", "active", "activist", "activity", "actor", "actress", "actual", "actually", "ad", "adapt", "add", "addition", "additional", "address", "adequate", "adjust", "adjustment", "administration", "administrator", "admire", "admission", "admit", "adolescent", "adopt", "adult", "advance", "advanced", "advantage", "adventure", "advertising", "advice", "advise", "adviser", "advocate", "affair", "affect", "afford", "afraid", "african", "african-american", "after", "afternoon", "again", "against", "age", "agency", "agenda", "agent", "aggressive", "ago", "agree", "agreement", "agricultural", "ah", "ahead", "aid", "aide", "aids", "aim", "air", "aircraft", "airline", "airport", "album", "alcohol", "alive", "all", "alliance", "allow", "ally", "almost", "alone", "along", "already", "also", "alter", "alternative", "although", "always", "am", "amazing", "american", "among", "amount", "analysis", "analyst", "analyze", "ancient", "and", "anger", "angle", "angry", "animal", "anniversary", "announce", "annual", "another", "answer", "anticipate", "anxiety", "any", "anybody", "anymore", "anyone", "anything", "anyway", "anywhere", "apart", "apartment", "apparent", "apparently", "appeal", "appear", "appearance", "apple", "application", "apply", "appoint", "appointment", "appreciate", "approach", "appropriate", "approval", "approve", "approximately", "arab", "architect", "area", "argue", "argument", "arise", "arm", "armed", "army", "around", "arrange", "arrangement", "arrest", "arrival", "arrive", "art", "article", "artist", "artistic", "as", "asian", "aside", "ask", "asleep", "aspect", "assault", "assert", "assess", "assessment", "asset", "assign", "assignment", "assist", "assistance", "assistant", "associate", "association", "assume", "assumption", "assure", "at", "athlete", "athletic", "atmosphere", "attach", "attack", "attempt", "attend", "attention", "attitude", "attorney", "attract", "attractive", "attribute", "audience", "author", "authority", "auto", "available", "average", "avoid", "award", "aware", "awareness", "away", "awful", "baby", 
    "back", "background", "bad", "badly", "bag", "bake", "balance", "ball", "ban", "band", "bank", "bar", "barely", "barrel", "barrier", "base", "baseball", "basic", "basically", "basis", "basket", "basketball", "bathroom", "battery", "battle", "be", "beach", "bean", "bear", "beat", "beautiful", "beauty", "because", "become", "bed", "bedroom", "beer", "before", "begin", "beginning", "behavior", "behind", "being", "belief", "believe", "bell", "belong", "below", "belt", "bench", "bend", "beneath", "benefit", "beside", "besides", "best", "bet", "better", "between", "beyond", "bible", "big", "bike", "bill", "billion", "bind", "biological", "bird", "birth", "birthday", "bit", "bite", "black", "blade", "blame", "blanket", "blind", "block", "blood", "blow", "blue", "board", "boat", "body", "bomb", "bombing", "bond", "bone", "book", "boom", "boot", "border", "born", "borrow", "boss", "both", "bother", "bottle", "bottom", "boundary", "bowl", "box", "boy", "boyfriend", "brain", "branch", "brand", "bread", "break", "breakfast", "breast", "breath", "breathe", "brick", "bridge", "brief", "briefly", "bright", "brilliant", "bring", "british", "broad", "broken", "brother", "brown", "brush", "buck", "budget", "build", "building", "bullet", "bunch", "burden", "burn", "bury", "bus", "business", "busy", "but", "butter", "button", "buy", "buyer", "by", "cabin", "cabinet", "cable", "cake", "calculate", "call", "camera", "camp", "campaign", "campus", "can", "canadian", "cancer", "candidate", "cap", "capability", "capable", "capacity", "capital", "captain", "capture", "car", "carbon", "card", "care", "career", "careful", "carefully", "carrier", "carry", "case", "cash", "cast", "cat", "catch", "category", "catholic", "cause", "ceiling", "celebrate", "celebration", "celebrity", "cell", "center", "central", "century", "ceo", "ceremony", "certain", "certainly", "chain", "chair", "chairman", "challenge", "chamber", "champion", "championship", "chance", "change", "changing", "channel", "chapter", "character", "characteristic", "characterize", "charge", "charity", "chart", "chase", "cheap", "check", "cheek", "cheese", "chef", "chemical", "chest", "chicken", "chief", "child", "childhood", "chinese", "chip", "chocolate", "choice", "cholesterol", "choose", "christian", "christmas", "church", "cigarette", "circle", "circumstance", "cite", "citizen", "city", "civil", "civilian", "claim", "class", 
    "classic", "classroom", "clean", "clear", "clearly", "client", "climate", "climb", "clinic", "clinical", "clock", "close", "closely", "closer", "clothes", "clothing", "cloud", "club", "clue", "cluster", "coach", "coal", "coalition", "coast", "coat", "code", "coffee", "cognitive", "cold", "collapse", "colleague", "collect", "collection", "collective", "college", "colonial", "color", "column", "combination", "combine", "come", "comedy", "comfort", "comfortable", "command", "commander", "comment", "commercial", "commission", "commit", "commitment", "committee", "common", "communicate", "communication", "community", "company", "compare", "comparison", "compete", "competition", "competitive", "competitor", "complain", "complaint", "complete", "completely", "complex", "complicated", "component", "compose", "composition", "comprehensive", "computer", "concentrate", "concentration", "concept", "concern", "concerned", "concert", "conclude", "conclusion", "concrete", "condition", "conduct", "conference", "confidence", "confident", "confirm", "conflict", "confront", "confusion", "congress", "congressional", "connect", "connection", "consciousness", "consensus", "consequence", "conservative", "consider", "considerable", "consideration", "consist", "consistent", "constant", "constantly", "constitute", "constitutional", "construct", "construction", "consultant", "consume", "consumer", "consumption", "contact", "contain", "container", "contemporary", "content", "contest", "context", "continue", "continued", "contract", "contrast", "contribute", "contribution", "control", "controversial", "controversy", "convention", "conventional", "conversation", "convert", "conviction", "convince", "cook", "cookie", "cooking", "cool", "cooperation", "cop", "cope", "copy", "core", "corn", "corner", "corporate", "corporation", "correct", "correspondent", "cost", "cotton", "couch", "could", "council", "counselor", "count", "counter", "country", "county", "couple", "courage", "course", "court", "cousin", "cover", "coverage", "cow", "crack", "craft", "crash", "crazy", "cream", "create", "creation", "creative", "creature", "credit", "crew", "crime", "criminal", "crisis", "criteria", "critic", "critical", "criticism", "criticize", "crop", "cross", "crowd", "crucial", "cry", "cultural", "culture", "cup", "curious", "current", "currently", "curriculum", "custom", "customer", "cut", "cycle", "dad", 
    "daily", "damage", "dance", "danger", "dangerous", "dare", "dark", "darkness", "data", "date", "daughter", "day", "dead", "deal", "dealer", "dear", "death", "debate", "debt", "decade", "decide", "decision", "deck", "declare", "deep", "deer", "delay", "deny", "depth", "desk", "die", "diet", "dig", "dirt", "dirty", "dish", "dna", "do", "dog", "door", "doubt", "down", "dozen", "draft", "drag", "drama", "draw", "dream", "dress", "drink", "drive", "drop", "drug", "dry", "due", "dust", "duty", "each", "eager", "ear", "early", "earn", "earth", "ease", "east", "easy", "eat", "edge", "egg", "eight", "elect", "elite", "else", "empty", "end", "enemy", "enjoy", "enter", "entry", "equal", "era", "error", "essay", "etc", "even", "event", "ever", "every", "exact", "exist", "extra", "eye", "face", "fact", "fade", "fail", "fair", "faith", "fall", "false", "fan", "far", "farm", "fast", "fat", "fate", "fault", "favor", "fear", "fee", "feed", "feel", "fence", "few", "fewer", "fiber", "field", "fifth", "fifty", "fight", "file", "fill", "film", "final", "find", "fine", "fire", "firm", "first", "fish", "fit", "five", "fix", "flag", "flame", "flat", "flee", "flesh", "float", "floor", "flow", "fly", "focus", "folk", "food", "foot", "for", "force", "form", "forth", "found", "four", "frame", "free", "fresh", "from", "front", "fruit", "fuel", "full", "fully", "fun", "fund", "funny", "gain", "game", "gang", "gap", "gas", "gate", "gay", "gaze", "gear", "gene", "get", "ghost", "giant", "gift", "girl", "give", "given", "glad", "glass", "glove", "go", "goal", "god", "gold", "golf", "good", "grab", "grade", "grain", "grand", "grant", "grass", "grave", "gray", "great", "green", "group", "grow", "guard", "guess", "guest", "guide", "gun", "guy", "habit", "hair", "half", "hall", "hand", "hang", "happy", "hard", "hat", "hate", "have", "he", "head", "hear", "heart", "heat", "heavy", "heel", "hell", "hello", "help", "her", "here", "hero", "hey", "hi", "hide", "high", "hill", "him", "hip", "hire", "his", "hit", "hold", "hole", "holy", "home", "honey", "honor", "hope", "horse", "host", "hot", "hotel", "hour", "house", "how", "huge", "human", "humor", "hurt", "i", "ice", "idea", "ideal", "ie", "if", "ill", "image", "imply", "in", "index", "inner", "into", "iraqi", "irish", "iron", "issue", "it", "item", "its", "jail", "jet", "jew", "job", "join", "joint", "joke", "joy", "judge", "juice", "jump", "jury", 
    "just", "keep", "key", "kick", "kid", "kill", "kind", "king", "kiss", "knee", "knife", "knock", "know", "lab", "label", "labor", "lack", "lady", "lake", "land", "lap", "large", "last", "late", "later", "latin", "laugh", "law", "lawn", "lay", "layer", "lead", "leaf", "lean", "learn", "least", "leave", "left", "leg", "legal", "lemon", "less", "let", "level", "lie", "life", "lift", "light", "like", "limit", "line", "link", "lip", "list", "live", "load", "loan", "local", "lock", "long", "look", "loose", "lose", "loss", "lost", "lot", "lots", "loud", "love", "lover", "low", "lower", "luck", "lucky", "lunch", "lung", "mad", "mail", "main", "major", "make", "maker", "male", "mall", "man", "many", "map", "mark", "marry", "mask", "mass", "match", "math", "may", "maybe", "mayor", "me", "meal", "mean", "meat", "media", "meet", "menu", "mere", "mess", "metal", "meter", "might", "milk", "mind", "mine", "minor", "miss", "mix", "mode", "model", "mom", "money", "month", "mood", "moon", "moral", "more", "most", "motor", "mount", "mouse", "mouth", "move", "movie", "mr", "mrs", "ms", "much", "music", "must", "my", "myth", "naked", "name", "near", "neck", "need", "nerve", "net", "never", "new", "newly", "news", "next", "nice", "night", "nine", "no", "nod", "noise", "none", "nor", "north", "nose", "not", "note", "novel", "now", "nurse", "nut", "occur", "ocean", "odd", "odds", "of", "off", "offer", "often", "oh", "oil", "ok", "okay", "old", "on", "once", "one", "onion", "only", "onto", "open", "or", "order", "other", "ought", "our", "out", "oven", "over", "owe", "own", "owner", "pace", "pack", "page", "pain", "paint", "pair", "pale", "palm", "pan", "panel", "pant", "paper", "park", "part", "party", "pass", "past", "patch", "path", "pause", "pay", "pc", "peace", "peak", "peer", "per", "pet", "phase", "phone", "photo", "piano", "pick", "pie", "piece", "pile", "pilot", "pine", "pink", "pipe", "pitch", "place", "plan", "plane", "plant", "plate", "play", "plot", "plus", "pm", "poem", "poet", "point", "pole", "poll", "pool", "poor", "pop", "porch", "port", "pose", "post", "pot", "pound", "pour", "power", "pray", "press", "price", "pride", "prime", "print", "prior", "proof", "proud", "prove", "pull", "pure", "push", "put", "quick", "quiet", "quit", "quite", "quote", "race", "radio", "rail", "rain", "raise", "range", "rank", "rapid", "rare", "rate", "ratio", "raw", "reach", "react", "read", 
    "ready", "real", "red", "refer", "relax", "rely", "reply", "rest", "rice", "rich", "rid", "ride", "rifle", "right", "ring", "rise", "risk", "river", "road", "rock", "role", "roll", "roof", "room", "root", "rope", "rose", "rough", "round", "route", "row", "rub", "rule", "run", "rural", "rush", "sad", "safe", "sake", "salad", "sale", "sales", "salt", "same", "sand", "sauce", "save", "say", "scale", "scene", "scope", "score", "sea", "seat", "see", "seed", "seek", "seem", "seize", "self", "sell", "send", "sense", "serve", "set", "seven", "shade", "shake", "shall", "shape", "share", "sharp", "she", "sheet", "shelf", "shell", "shift", "shine", "ship", "shirt", "shit", "shock", "shoe", "shoot", "shop", "shore", "short", "shot"];
const hardWords = ["decline", "decrease", "deeply", "defeat", "defend", "defendant", "defense", "defensive", "deficit", "define", "definitely", "definition", "degree", "deliver", "delivery", "demand", "democracy", "democrat", "democratic", "demonstrate", "demonstration", "department", "depend", "dependent", "depending", "depict", "depression", "deputy", "derive", "describe", "description", "desert", "deserve", "design", "designer", "desire", "desperate", "despite", "destroy", "destruction", "detail", "detailed", "detect", "determine", "develop", "developing", "development", "device", "devote", "dialogue", "differ", "difference", "different", "differently", "difficult", "difficulty", "digital", "dimension", "dining", "dinner", "direct", "direction", "directly", "director", "disability", "disagree", "disappear", "disaster", "discipline", "discourse", "discover", "discovery", "discrimination", "discuss", "discussion", "disease", "dismiss", "disorder", "display", "dispute", "distance", "distant", "distinct", "distinction", "distinguish", "distribute", "distribution", "district", "diverse", "diversity", "divide", "division", "divorce", "doctor", "document", "domestic", "dominant", "dominate", "double", "downtown", "dramatic", "dramatically", "drawing", "driver", "during", "earnings", "easily", "eastern", "economic", "economics", "economist", "economy", "edition", "editor", "educate", "education", "educational", "educator", "effect", "effective", "effectively", "efficiency", "efficient", "effort", "either", "elderly", "election", "electric", "electricity", "electronic", "element", "elementary", "eliminate", "elsewhere", "e-mail", "embrace", "emerge", "emergency", "emission", "emotion", "emotional", "emphasis", "emphasize", "employ", "employee", "employer", "employment", "enable", "encounter", "encourage", "energy", "enforcement", "engage", "engine", "engineer", "engineering", "english", "enhance", "enormous", "enough", "ensure", "enterprise", "entertainment", "entire", "entirely", "entrance", "environment", "environmental", "episode", "equally", "equipment", "escape", "especially", "essential", "essentially", "establish", "establishment", "estate", "estimate", "ethics", "ethnic", "european", "evaluate", "evaluation", "evening", "eventually", "everybody", "everyday", "everyone", "everything", "everywhere", "evidence", "evolution", "evolve", "exactly", "examination", "examine", 
    "example", "exceed", "excellent", "except", "exception", "exchange", "exciting", "executive", "exercise", "exhibit", "exhibition", "existence", "existing", "expand", "expansion", "expect", "expectation", "expense", "expensive", "experience", "experiment", "expert", "explain", "explanation", "explode", "explore", "explosion", "expose", "exposure", "express", "expression", "extend", "extension", "extensive", "extent", "external", "extraordinary", "extreme", "extremely", "fabric", "facility", "factor", "factory", "faculty", "failure", "fairly", "familiar", "family", "famous", "fantasy", "farmer", "fashion", "father", "favorite", "feature", "federal", "feeling", "fellow", "female", "fiction", "fifteen", "fighter", "fighting", "figure", "finally", "finance", "financial", "finding", "finger", "finish", "fishing", "fitness", "flavor", "flight", "flower", "follow", "following", "football", "foreign", "forest", "forever", "forget", "formal", "formation", "former", "formula", "fortune", "forward", "foundation", "founder", "fourth", "framework", "freedom", "freeze", "french", "frequency", "frequent", "frequently", "friend", "friendly", "friendship", "frustration", "function", "fundamental", "funding", "funeral", "furniture", "furthermore", "future", "galaxy", "gallery", "garage", "garden", "garlic", "gather", "gender", "general", "generally", "generate", "generation", "genetic", "gentleman", "gently", "german", "gesture", "gifted", "girlfriend", "glance", "global", "golden", "government", "governor", "gradually", "graduate", "grandfather", "grandmother", "greatest", "grocery", "ground", "growing", "growth", "guarantee", "guideline", "guilty", "habitat", "handful", "handle", "happen", "hardly", "headline", "headquarters", "health", "healthy", "hearing", "heaven", "heavily", "height", "helicopter", "helpful", "heritage", "herself", "highlight", "highly", "highway", "himself", "historian", "historic", "historical", "history", "holiday", "homeless", "honest", "horizon", "horror", "hospital", "household", "housing", "however", "hundred", "hungry", "hunter", "hunting", "husband", "hypothesis", "identification", "identify", "identity", "ignore", "illegal", "illness", "illustrate", "imagination", "imagine", "immediate", "immediately", "immigrant", "immigration", "impact", "implement", "implication", "importance", "important", "impose", "impossible", "impress", "impression", "impressive", 
    "improve", "improvement", "incentive", "incident", "include", "including", "income", "incorporate", "increase", "increased", "increasing", "increasingly", "incredible", "indeed", "independence", "independent", "indian", "indicate", "indication", "individual", "industrial", "industry", "infant", "infection", "inflation", "influence", "inform", "information", "ingredient", "initial", "initially", "initiative", "injury", "innocent", "inquiry", "inside", "insight", "insist", "inspire", "install", "instance", "instead", "institution", "institutional", "instruction", "instructor", "instrument", "insurance", "intellectual", "intelligence", "intend", "intense", "intensity", "intention", "interaction", "interest", "interested", "interesting", "internal", "international", "internet", "interpret", "interpretation", "intervention", "interview", "introduce", "introduction", "invasion", "invest", "investigate", "investigation", "investigator", "investment", "investor", "invite", "involve", "involved", "involvement", "islamic", "island", "israeli", "italian", "itself", "jacket", "japanese", "jewish", "journal", "journalist", "journey", "judgment", "junior", "justice", "justify", "killer", "killing", "kitchen", "knowledge", "laboratory", "landscape", "language", "largely", "latter", "launch", "lawsuit", "lawyer", "leader", "leadership", "leading", "league", "learning", "leather", "legacy", "legend", "legislation", "legitimate", "length", "lesson", "letter", "liberal", "library", "license", "lifestyle", "lifetime", "likely", "limitation", "limited", "listen", "literally", "literary", "literature", "little", "living", "locate", "location", "long-term", "lovely", "machine", "magazine", "mainly", "maintain", "maintenance", "majority", "makeup", "manage", "management", "manager", "manner", "manufacturer", "manufacturing", "margin", "market", "marketing", "marriage", "married", "massive", "master", "material", "matter", "meaning", "meanwhile", "measure", "measurement", "mechanism", "medical", "medication", "medicine", "medium", "meeting", "member", "membership", "memory", "mental", "mention", "merely", "message", "method", "mexican", "middle", "military", "million", "minister", "minority", "minute", "miracle", "mirror", "missile", "mission", "mistake", "mixture", "mm-hmm", "moderate", "modern", "modest", "moment", "monitor", "moreover", "morning", "mortgage", "mostly", "mother", "motion", 
    "motivation", "mountain", "movement", "multiple", "murder", "muscle", "museum", "musical", "musician", "muslim", "mutual", "myself", "mystery", "narrative", "narrow", "nation", "national", "native", "natural", "naturally", "nature", "nearby", "nearly", "necessarily", "necessary", "negative", "negotiate", "negotiation", "neighbor", "neighborhood", "neither", "nervous", "network", "nevertheless", "newspaper", "nobody", "nomination", "nonetheless", "normal", "normally", "northern", "nothing", "notice", "notion", "nowhere", "nuclear", "number", "numerous", "object", "objective", "obligation", "observation", "observe", "observer", "obtain", "obvious", "obviously", "occasion", "occasionally", "occupation", "occupy", "offense", "offensive", "office", "officer", "official", "olympic", "ongoing", "online", "opening", "operate", "operating", "operation", "operator", "opinion", "opponent", "opportunity", "oppose", "opposite", "opposition", "option", "orange", "ordinary", "organic", "organization", "organize", "orientation", "origin", "original", "originally", "others", "otherwise", "ourselves", "outcome", "outside", "overall", "overcome", "overlook", "package", "painful", "painter", "painting", "palestinian", "parent", "parking", "participant", "participate", "participation", "particular", "particularly", "partly", "partner", "partnership", "passage", "passenger", "passion", "patient", "pattern", "payment", "penalty", "people", "pepper", "perceive", "percentage", "perception", "perfect", "perfectly", "perform", "performance", "perhaps", "period", "permanent", "permission", "permit", "person", "personal", "personality", "personally", "personnel", "perspective", "persuade", "phenomenon", "philosophy", "photograph", "photographer", "phrase", "physical", "physically", "physician", "picture", "planet", "planning", "plastic", "platform", "player", "please", "pleasure", "plenty", "pocket", "poetry", "police", "policy", "political", "politically", "politician", "politics", "pollution", "popular", "population", "portion", "portrait", "portray", "position", "positive", "possess", "possibility", "possible", "possibly", "potato", "potential", "potentially", "poverty", "powder", "powerful", "practical", "practice", "prayer", "precisely", "predict", "prefer", "preference", "pregnancy", "pregnant", "preparation", "prepare", "prescription", "presence", "present", "presentation", "preserve", 
    "president", "presidential", "pressure", "pretend", "pretty", "prevent", "previous", "previously", "priest", "primarily", "primary", "principal", "principle", "priority", "prison", "prisoner", "privacy", "private", "probably", "problem", "procedure", "proceed", "process", "produce", "producer", "product", "production", "profession", "professional", "professor", "profile", "profit", "program", "progress", "project", "prominent", "promise", "promote", "prompt", "proper", "properly", "property", "proportion", "proposal", "propose", "proposed", "prosecutor", "prospect", "protect", "protection", "protein", "protest", "provide", "provider", "province", "provision", "psychological", "psychologist", "psychology", "public", "publication", "publicly", "publish", "publisher", "punishment", "purchase", "purpose", "pursue", "qualify", "quality", "quarter", "quarterback", "question", "quickly", "quietly", "racial", "radical", "rapidly", "rarely", "rather", "rating", "reaction", "reader", "reading", "reality", "realize", "really", "reason", "reasonable", "recall", "receive", "recent", "recently", "recipe", "recognition", "recognize", "recommend", "recommendation", "record", "recording", "recover", "recovery", "recruit", "reduce", "reduction", "reference", "reflect", "reflection", "reform", "refugee", "refuse", "regard", "regarding", "regardless", "regime", "region", "regional", "register", "regular", "regularly", "regulate", "regulation", "reinforce", "reject", "relate", "relation", "relationship", "relative", "relatively", "release", "relevant", "relief", "religion", "religious", "remain", "remaining", "remarkable", "remember", "remind", "remote", "remove", "repeat", "repeatedly", "replace", "report", "reporter", "represent", "representation", "representative", "republican", "reputation", "request", "require", "requirement", "research", "researcher", "resemble", "reservation", "resident", "resist", "resistance", "resolution", "resolve", "resort", "resource", "respect", "respond", "respondent", "response", "responsibility", "responsible", "restaurant", "restore", "restriction", "result", "retain", "retire", "retirement", "return", "reveal", "revenue", "review", "revolution", "rhythm", "romantic", "roughly", "routine", "running", "russian", "sacred", "safety", "salary", "sample", "sanction", "satellite", "satisfaction", "satisfy", "saving", "scandal", "scared", "scenario", "schedule", 
    "scheme", "scholar", "scholarship", "school", "science", "scientific", "scientist", "scream", "screen", "script", "search", "season", "second", "secret", "secretary", "section", "sector", "secure", "security", "segment", "select", "selection", "senate", "senator", "senior", "sensitive", "sentence", "separate", "sequence", "series", "serious", "seriously", "service", "session", "setting", "settle", "settlement", "several", "severe", "sexual", "shadow", "shelter", "shooting", "shopping", "shortly", "should", "shoulder", "shout", "show", "shower", "shrug", "shut", "sick", "side", "sigh", "sight", "sign", "signal", "significance", "significant", "significantly", "silence", "silent", "silver", "similar", "similarly", "simple", "simply", "sin", "since", "sing", "singer", "single", "sink", "sir", "sister", "sit", "site", "situation", "six", "size", "ski", "skill", "skin", "sky", "slave", "sleep", "slice", "slide", "slight", "slightly", "slip", "slow", "slowly", "small", "smart", "smell", "smile", "smoke", "smooth", "snap", "snow", "so", "so-called", "soccer", "social", "society", "soft", "software", "soil", "solar", "soldier", "solid", "solution", "solve", "some", "somebody", "somehow", "someone", "something", "sometimes", "somewhat", "somewhere", "son", "song", "soon", "sophisticated", "sorry", "sort", "soul", "sound", "soup", "source", "south", "southern", "soviet", "space", "spanish", "speak", "speaker", "special", "specialist", "species", "specific", "specifically", "speech", "speed", "spend", "spending", "spin", "spirit", "spiritual", "split", "spokesman", "sport", "spot", "spread", "spring", "square", "squeeze", "stability", "stable", "staff", "stage", "stair", "stake", "stand", "standard", "standing", "star", "stare", "start", "state", "statement", "station", "statistics", "status", "stay", "steady", "steal", "steel", "step", "stick", "still", "stir", "stock", "stomach", "stone", "stop", "storage", "store", "storm", "story", "straight", "strange", "stranger", "strategic", "strategy", "stream", "street", "strength", "strengthen", "stress", "stretch", "strike", "string", "strip", "stroke", "strong", "strongly", "structure", "struggle", "student", "studio", "study", "stuff", "stupid", "style", "subject", "submit", "subsequent", "substance", "substantial", "succeed", "success", "successful", "successfully", "such", "sudden", "suddenly", "sue", "suffer", "sufficient", "sugar", 
    "suggest", "suggestion", "suicide", "suit", "summer", "summit", "sun", "super", "supply", "support", "supporter", "suppose", "supposed", "supreme", "sure", "surely", "surface", "surgery", "surprise", "surprised", "surprising", "surprisingly", "surround", "survey", "survival", "survive", "survivor", "suspect", "sustain", "swear", "sweep", "sweet", "swim", "swing", "switch", "symbol", "symptom", "system", "table", "tablespoon", "tactic", "tail", "take", "tale", "talent", "talk", "tall", "tank", "tap", "tape", "target", "task", "taste", "tax", "taxpayer", "tea", "teach", "teacher", "teaching", "team", "tear", "teaspoon", "technical", "technique", "technology", "teen", "teenager", "telephone", "telescope", "television", "tell", "temperature", "temporary", "ten", "tend", "tendency", "tennis", "tension", "tent", "term", "terms", "terrible", "territory", "terror", "terrorism", "terrorist", "test", "testify", "testimony", "testing", "text", "than", "thank", "thanks", "that", "the", "theater", "their", "them", "theme", "themselves", "then", "theory", "therapy", "there", "therefore", "these", "they", "thick", "thin", "thing", "think", "thinking", "third", "thirty", "this", "those", "though", "thought", "thousand", "threat", "threaten", "three", "throat", "through", "throughout", "throw", "thus", "ticket", "tie", "tight", "time", "tiny", "tip", "tire", "tired", "tissue", "title", "to", "tobacco", "today", "toe", "together", "tomato", "tomorrow", "tone", "tongue", "tonight", "too", "tool", "tooth", "top", "topic", "toss", "total", "totally", "touch", "tough", "tour", "tourist", "tournament", "toward", "towards", "tower", "town", "toy", "trace", "track", "trade", "tradition", "traditional", "traffic", "tragedy", "trail", "train", "training", "transfer", "transform", "transformation", "transition", "translate", "transportation", "travel", "treat", "treatment", "treaty", "tree", "tremendous", "trend", "trial", "tribe", "trick", "trip", "troop", "trouble", "truck", "true", "truly", "trust", "truth", "try", "tube", "tunnel", "turn", "tv", "twelve", "twenty", "twice", "twin", "two", "type", "typical", "typically", "ugly", "ultimate", "ultimately", "unable", "uncle", "under", "undergo", "understand", "understanding", "unfortunately", "uniform", "union", "unique", "unit", "united", "universal", "universe", "university", "unknown", "unless", "unlike", "unlikely", "until", "unusual", "up", "upon", 
    "upper", "urban", "urge", "us", "use", "used", "useful", "user", "usual", "usually", "utility", "vacation", "valley", "valuable", "value", "variable", "variation", "variety", "various", "vary", "vast", "vegetable", "vehicle", "venture", "version", "versus", "very", "vessel", "veteran", "via", "victim", "victory", "video", "view", "viewer", "village", "violate", "violation", "violence", "violent", "virtually", "virtue", "virus", "visible", "vision", "visit", "visitor", "visual", "vital", "voice", "volume", "volunteer", "vote", "voter", "vs", "vulnerable", "wage", "wait", "wake", "walk", "wall", "wander", "want", "war", "warm", "warn", "warning", "wash", "waste", "watch", "water", "wave", "way", "we", "weak", "wealth", "wealthy", "weapon", "wear", "weather", "wedding", "week", "weekend", "weekly", "weigh", "weight", "welcome", "welfare", "well", "west", "western", "wet", "what", "whatever", "wheel", "when", "whenever", "where", "whereas", "whether", "which", "while", "whisper", "white", "who", "whole", "whom", "whose", "why", "wide", "widely", "widespread", "wife", "wild", "will", "willing", "win", "wind", "window", "wine", "wing", "winner", "winter", "wipe", "wire", "wisdom", "wise", "wish", "with", "withdraw", "within", "without", "witness", "woman", "wonder", "wonderful", "wood", "wooden", "word", "work", "worker", "working", "works", "workshop", "world", "worried", "worry", "worth", "would", "wound", "wrap", "write", "writer", "writing", "wrong", "yard", "yeah", "year", "yell", "yellow", "yes", "yesterday", "yet", "yield", "you", "young", "your", "yours", "yourself", "youth", "zone"];

// display words
function displayWords(difficulty) {
    finalDiff = easyWords;
    if(difficulty == 1) {
        finalDiff = hardWords;
    }

    // plant the words in using randomization
    let words = [];
    wordArr = [];
    for(let i = 0; i < 200; i++) {
        let rando = Math.floor((Math.random() * finalDiff.length));
        words.push(finalDiff[rando]);
        if(words[i] == null) {
            console.log(rando);
        }
    }

    test.innerHTML = "";
    // chang the words
    for(const word of words) {
        let wordDiv = document.createElement("div");
        wordDiv.className = "word";

        test.appendChild(wordDiv);

        // This is to maintain the order so that we can keep track of the correct mapping between key and letter
        wordArr.push(wordDiv);

        // check which word is causing the iteration error
        // console.log(wordArr);
        // console.log(word);

        for(const letter of word) {
            let letterDiv = document.createElement("div");
            letterDiv.className = "letter";
            letterDiv.textContent = letter;
            wordDiv.appendChild(letterDiv);
        }
    }
    // make current word
    currentWord = wordArr[0];
    currentWord.children[0].className = "activeLetter";
    checkLast();
}

// get the last word in each row
function checkLast() {
    let sum = 0;
    let row = 0;
    for(let i = 0; i < 200; i++) {
        sum += wordArr[i].offsetWidth + 12;
        if (i != 199) {
            if (wordArr[i].className == "last" || wordArr[i].className == "firstLast") wordArr[i].className = "word";
            if (wordArr[i].className == "wrongLast" || wordArr[i].className == "wrongFirst") wordArr[i].className = "wrong";
            if (wordArr[i].className == "correctLast" || wordArr[i].className == "correctFirst") wordArr[i].className = "correct";
            if (width < sum + wordArr[i+1].offsetWidth + 12) {
                if (row == 0) {
                    if (wordArr[i].className == "word") wordArr[i].className = "firstLast";
                    if (wordArr[i].className == "wrong") wordArr[i].className = "wrongFirst";
                    if (wordArr[i].className == "correct") wordArr[i].className = "correctFirst";
                    row++;
                } else {
                    if (wordArr[i].className == "word") wordArr[i].className = "last";
                    if (wordArr[i].className == "wrong") wordArr[i].className = "wrongLast";
                    if (wordArr[i].className == "correct") wordArr[i].className = "correctLast";
                }
                sum = 0;
            }
        }
        if (i == 199) {
            wordArr[i].className = "last";
            sum = 0;
        }
    }
}

// Check if end of word
function checkSibling(node) {
    if(node.nextSibling == null) {
        if(wrongLetter > 0) {
            if (currentWord.className == "firstLast") currentWord.className = "wrongFirst";
            if (currentWord.className == "last") currentWord.className = "wrongLast";
            if (currentWord.className == "word") currentWord.className = "wrong";
        } else {
            if (currentWord.className == "firstLast") currentWord.className = "correctFirst";
            if (currentWord.className == "last") currentWord.className = "correctLast";
            if (currentWord.className == "word") currentWord.className = "correct";
        }
        return;
    }
    currentWord.querySelector(".letter").className = "activeLetter";
}

// Update the timer
function updateTimer() {
    if(countdown > 0) {
      countdown--;
      timer[0].textContent = countdown;
    } else {
      // finishGame();
    }
}

// reset timer
function resetTimer() {
    timer[0].style.visibility = "hidden";
    clearInterval(interval);
    if (localStorage.getItem("30") == 0) {
        timer[0].textContent = "30";
        countdown = 30;
    } else {
        timer[0].textContent = "60";
        countdown = 60;
    }
}

// make the cursor move
function moveCursor(dir, multi) {
    style = getComputedStyle(cursor);
    switch (dir) {
        case ">":
            current = style.left;
            value = parseInt(current.substring(0,current.length - 2));
            cursor.style.left = (value + (12*multi)) + "px";
            break;
        case "<":
            current = style.left;
            value = parseInt(current.substring(0,current.length - 2));
            cursor.style.left = (value - 12) + "px";
            break;
        case "_":
            cursor.style.left = "5px";
            cursor.style.top = "43px";
            break;
        default:
            cursor.style.left = "5px";
            cursor.style.top = "3.6px";
    }
}

// Shift the text
function moveText() {
    if (first == 0) {
        let child = (document.querySelector(".correctFirst") || document.querySelector(".wrongFirst"));
        let original = child;
        while (!!child.previousElementSibling) {
            child.previousElementSibling.remove();
        }
        test.removeChild(original);
        first++;
    } else {
        let original = prevLast;
        while (!!prevLast.previousElementSibling) {
          prevLast.previousElementSibling.remove();
        }
        test.removeChild(original);
    }
}

function refreshTest() {
    resetTimer();
    textArea.style.filter = "none";
    if(first == 0) first++;
    localStorage.setItem("start", 0);
    wrongLetter = 0;
    index = 0;
    moveCursor("",1);
    localStorage.getItem("easy") ? displayWords(0) : displayWords(1);
}

function finishGame() {
    errorDisplay.textContent = totalWrongLetters;
    errorDisplay.style.color = "orangered";
    accuracy = Math.round(((typedLetters-totalErrors)/typedLetters) * 100);
    accuracyDisplay.textContent = accuracy + "%";
    localStorage.getItem("30") ? countdown = 30 : countdown = 60;
    wpm = Math.round((((typedLetters / 5) / parseInt(countdown)) * 60));
    wpmDisplay.textContent = wpm;
    resetTimer();
    textArea.style.filter = "blur(10px)";
}

// Gives functions to letters, spacebar and backspace (TODO tab button)
function checkKey(key) {
    let letter = currentWord.querySelector(".activeLetter");
    switch(key) {
      case 'Backspace':
        if(localStorage.getItem("start") != 0) {
            if(letter == null) {
                // this means that the current word does not have any active letter
                let currentClassName = currentWord.lastChild.className;
                if(currentClassName == "wrongAddedLetter") {
                    currentWord.removeChild(currentWord.lastChild);
                    wrongLetter--;
                } else if(currentClassName == "correctLetter" || currentClassName == "wrongLetter") {
                    currentWord.lastChild.className = "activeLetter";
                    if(currentClassName == "wrongLetter") wrongLetter--;
                }
                moveCursor("<",1);
            } else {
                if(letter.previousElementSibling != null){
                    if(letter.previousElementSibling.className == "wrongLetter") {
                      wrongLetter--;
                    }
                    letter.className = "letter";
                    letter.previousElementSibling.className = "activeLetter";
                    moveCursor("<",1);
                }
            }
            if(wrongLetter == 0) {
                // currentWord.className = "word";
                if (currentWord.className == "correctLast" || currentWord.className == "wrongLast") currentWord.className = "last";
                if (currentWord.className == "wrongFirst" || currentWord.className == "correctFirst") currentWord.className = "firstLast";
                if (currentWord.className == "wrong" || currentWord.className == "correct") currentWord.className = "word";
            }
        }
        break;
      
      case " ":
          if(currentWord.className == "word") {
              currentWord.className = "wrong";
              letter.className = "letter";
          }
          totalChildren = currentWord.childElementCount;
          if(letter != null) {
              let i = 0;
              child = letter;
              while( (child = child.previousSibling) != null ) {
                i++;
              }
              moveCursor(">", totalChildren-i+1);
          } else {
              if(currentWord.className == "wrongFirst" || currentWord.className == "correctFirst") {
                  first--;
                  moveCursor("_", 1);
              }
              else if(currentWord.className == "wrongLast" || currentWord.className == "correctLast") {
                  moveCursor("_", 1);
                  moveText();
                  prevLast=currentWord;
              }
              else moveCursor(">", 1);
          }

          totalWrongLetters += wrongLetter;
          wrongLetter = 0;
          index++;
          currentWord = wordArr[index];
          currentWord.children[0].className = "activeLetter";
          break;
      
      case letter != null && letter.textContent:
          letter.className = "correctLetter";
          typedLetters++;
          moveCursor(">",1);
          checkSibling(letter);
          break;          

      default:
          typedLetters++;
          wrongLetter++;
          totalErrors++;
          if(letter == null) {
              // this means the user keep typing in the same word without pressing spacebar
              
              let letterDiv = document.createElement("div");
              letterDiv.className = "wrongAddedLetter";
              letterDiv.textContent = key;
              currentWord.appendChild(letterDiv); 
              currentWord.className = "wrong";
              checkLast();
          } else {
              letter.className = "wrongLetter";
              checkSibling(letter);
          } 
          moveCursor(">",1);
    }
}

// Set the words to default easy
displayWords(0);

// All the events
addEventListener("load", () => {
    width = textArea.offsetWidth;
    checkLast();
})

window.addEventListener("resize", () => {
    width = textArea.offsetWidth;
    checkLast();
})

thirty.addEventListener("click", () => {
    timer[0].textContent = "30";
    countdown = 30;
    thirty.style.opacity = "100%";
    sixty.style.opacity = "50%";
    localStorage.setItem("30", 0);
});

sixty.addEventListener("click", () => {
    timer[0].textContent = "60";
    countdown = 60;
    thirty.style.opacity = "50%";
    sixty.style.opacity = "100%";
    localStorage.setItem("30", 1);
});

easy.addEventListener("click", () => {
    easy.style.opacity = "100%";
    hard.style.opacity = "50%";
    localStorage.setItem("easy", 1);
    displayWords(0);
});

hard.addEventListener("click", () => {
    easy.style.opacity = "50%";
    hard.style.opacity = "100%";
    localStorage.setItem("easy", 0);
    displayWords(1);
});

refresh.addEventListener("click", refreshTest, false);
refresh.addEventListener("keydown", (e) => {
    e.key == "Enter" ? refreshTest() : e.preventDefault();
});

window.addEventListener('keydown', (e) => {
  try {
    key = e.key;
    if(e.code != 0) {
      // only allow tab, spacebar, backspace and [a-z]
        if (key == " " || key == "Backspace" || /^[a-z]$/.test(key)) {
            if(localStorage.getItem("start")== 0){
              timer[0].style.visibility = "visible";
              interval = setInterval(updateTimer, 1000);
            }
            localStorage.setItem("start", 1);
            checkKey(key);
        }
        else if (key != "Tab") {
            e.preventDefault();
        }
    }
  }
  catch (err) {
    console.log(err);
  }
    // TODO found a cheating bug user can change difficulty and timer 
});
