/*
 * This file acts as the primary data layer of the web form.
 *
 *		SCALE DEGREES OF PHI FOR REFERENCE:
 *		46.9708196
 *		29.0301728
 *		17.9420104
 *		11.0890052
 *		6.85352607
 *		4.23580103
 *		2.617924
 *		1.618
 *		1
 *
 */

// Primary data layer. Array of objects, each with subcategory array of objects

const fields = [
    {
        title: "Story",
        scale: 6.85352607,
        subcategories: [
            {
                title: "Pacing",
                description: "How well does the story flow, including during scenes, between scenes, and between acts?",
                scale: 46.9708196
            },
            {
                title: "Dialogue",
                description: "How well is the dialogue as written?",
                scale: 29.0301728
            },
            {
                title: "Tonal Consistency",
                description: "How well does the film clearly convey its tone and maintain it throughout the film?",
                scale: 17.9420104
            },
            {
                title: "Dimension",
                description: "How well does the film use subtext, symbolism, and metaphor to give the story a deeper meaning?",
                scale: 11.0890052
            },
            {
                title: "Breadth of Conflict",
                description: "How well does the story’s driving conflict match the scope of the story in terms of its stakes?",
                scale: 6.85352607
            },
            {
                title: "Resolution Appropriateness",
                description: "How well does the story’s resolution wrap up the conflict in a believable way?",
                scale: 4.23580103
            },
            {
                title: "Logic",
                description: "How good is the cause-and-effect relationship of events in the story?",
                scale: 2.617924
            },
            {
                title: "Character Motivation",
                description: "How much do the character motivations make sense for the characters as written and how well do they drive the characters’ actions?",
                scale: 1.618
            },
            {
                title: "Originality or Satisfaction of Adaptation",
                description: "If the story is an original work, how well does it avoid cliches and stereotypical storylines and characters? If the story is an adaptation, how well does translate the story of the original work to film?",
                scale: 1
            }
        ]
    },
    {
        title: "Performance",
        scale: 4.23580103,
        subcategories: [
            {
                title: "Physicality",
                description: "How well do the performers utilize their bodies and movements to portray their character?",
                scale: 11.0890052
            },
            {
                title: "Vocals and Linguistics",
                description: "How good is the performers’ dialogue delivery (including accents)?",
                scale: 6.85352607
            },
            {
                title: "Chemistry",
                description: "How well do the performers work with each other on-screen?",
                scale: 4.23580103
            },
            {
                title: "Believability",
                description: "How well do the performances match the expectations for how the characters would behave?",
                scale: 2.617924
            },
            {
                title: "Range",
                description: "How well do the performers convey different emotions and levels of feeling?",
                scale: 1.618
            },
            {
                title: "Distinction of the Role",
                description: "How much do the roles differ from past roles that the performers have done?",
                scale: 1
            }
        ]
    },
    {
        title: "Visuals",
        scale: 2.617924,
        subcategories: [
            {
                title: "Cinematography",
                description: "How original and purposeful is the film’s shot composition?",
                scale: 17.9420104
            },
            {
                title: "Lighting",
                description: "How well does the film’s lighting contribute to its visuals?",
                scale: 11.0890052
            },
            {
                title: "Production Design",
                description: "How well does the film establish and convey its overall aesthetic?",
                scale: 6.85352607
            },
            {
                title: "Quality of Special Effects",
                description: "How believable do the film’s special visual effects look?",
                scale: 4.23580103
            },
            {
                title: "Appropriateness of Special Effects",
                description: "How well does the film refrain from using gratuitous, unnecessary, or inconsistent special visual effects?",
                scale: 2.617924
            },
            {
                title: "Technical Innovation",
                description: "How much does the film pioneer new cinematic techniques or new special effects technology?",
                scale: 1.618
            },
            {
                title: "Typography",
                description: "How well do the film’s fonts match the its aesthetic and avoid creating a distraction from the shots upon which they are overlaid?",
                scale: 1
            }
        ]
    },
    {
        title: "Audio",
        scale: 1.618,
        subcategories: [
            {
                title: "Score",
                description: "How well do the film’s original compositions complement or enhance the other aspects of the film?",
                scale: 6.85352607
            },
            {
                title: "Soundtrack",
                description: "How well do the film’s non-original compositions complement or enhance the other aspects of the film?",
                scale: 4.23580103
            },
            {
                title: "Mixing",
                description: "How well does the film’s audio mixing keep each element clearly heard and highlight the most important elements?",
                scale: 2.617924
            },
            {
                title: "Use of sound effects",
                description: "How well does the film appropriately utilize sound effects?",
                scale: 1.618
            },
            {
                title: "Foley Quality",
                description: "How good are the film’s Foley sound effects?",
                scale: 1
            }
        ]
    },
    {
        title: "Construction",
        scale: 1,
        subcategories: [
            {
                title: "Transitions",
                description: "How good are the cuts that transition one scene to the next?",
                scale: 4.23580103
            },
            {
                title: "Shot consistency/continuity",
                description: "How well do shots within the same scene maintain consistent visual elements?",
                scale: 2.617924
            },
            {
                title: "Coherence",
                description: "How well does the editing keep the story events clear and help them progress logically?",
                scale: 1.618
            },
            {
                title: "Efficiency",
                description: "How well does the film’s editing cut unnecessary content and leave in necessary content?",
                scale: 1
            }
        ]
    }
]

module.exports = {
    fields
}