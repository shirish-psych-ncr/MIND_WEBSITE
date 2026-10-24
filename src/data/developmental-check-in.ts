/** Original observation prompts. Age routing is not a validated clinical cutoff. */
export type Answer = 'yes' | 'no' | 'unsure' | 'na';
export type Question = { id: string; domain: string; text: string; hint: string; min: number; max: number; parent?: string; urgent?: boolean };
export const version = '2026-10-24.2';
const q = (id: string, domain: string, min: number, max: number, text: string, hint = '', parent?: string, urgent = false): Question => ({ id, domain, min, max, text, hint, parent, urgent });
export const questions: Question[] = [
  q('loss-sounds', 'Changes you have noticed', 0, 23, 'Has your child stopped making sounds they used to make?', 'Think about sounds they used often, not a quiet day.', undefined, true),
  q('loss-words', 'Changes you have noticed', 12, 155, 'Has your child stopped using words they used to say?', 'Choose “Does not apply” if your child has not started using words.', undefined, true),
  q('loss-movement', 'Changes you have noticed', 0, 155, 'Has your child lost a movement skill they used to have?', 'Think about a movement they could do before but can no longer do.', undefined, true),
  q('loss-play', 'Changes you have noticed', 12, 155, 'Has your child stopped doing a familiar play activity they used to manage?', 'Think about losing the ability, rather than losing interest in a toy.', undefined, true),
  q('baby-social', 'Connecting with people', 0, 5, 'Are you worried about how your baby responds to your face?', 'Think about quiet moments when your baby is awake.'),
  q('baby-settle', 'Connecting with people', 0, 11, 'Is it often hard to comfort your baby?', 'For example, when you hold them in a way they usually like.'),
  q('social-smile', 'Connecting with people', 6, 23, 'Are you worried about how often your child smiles back at you?', 'Think about relaxed moments together.'),
  q('social-name', 'Connecting with people', 12, 155, 'Does your child often seem not to notice when you call their name?', 'Think about a quiet room. This answer cannot tell us whether there is a hearing difficulty.'),
  q('social-name-quiet', 'Connecting with people', 12, 155, 'Does this also happen when your child is not busy with something?', '', 'social-name'),
  q('social-share', 'Connecting with people', 12, 71, 'Are you worried about how your child shows you things they enjoy?', 'They might show you a toy or bring you something interesting.'),
  q('social-play', 'Connecting with people', 24, 155, 'Does your child find it hard to join play with other children?', 'Choose “Does not apply” if they have not had a chance to play with other children.'),
  q('social-play-familiar', 'Connecting with people', 24, 155, 'Is joining play difficult even with a familiar child?', '', 'social-play'),
  q('social-friendship', 'Connecting with people', 72, 155, 'Does your child find it hard to keep a friendship?', 'Think about friendships your child wants to have.'),
  q('social-conversation', 'Connecting with people', 48, 155, 'Does your child find it hard to take turns in a conversation?', 'Include the communication method your child normally uses.'),
  q('baby-sounds', 'Communicating', 0, 11, 'Are you worried about the sounds your baby makes?', 'Think about their usual sounds while they are awake.'),
  q('gestures', 'Communicating', 12, 35, 'Are you worried about how your child uses gestures to communicate?', 'For example, reaching towards something they want.'),
  q('needs', 'Communicating', 12, 155, 'Does your child find it hard to let you know what they need?', 'Count gestures, signs, pictures and communication aids as well as speech.'),
  q('needs-frustration', 'Communicating', 12, 155, 'Does your child get upset when they cannot get their message across?', '', 'needs'),
  q('understanding', 'Communicating', 24, 155, 'Does your child find it hard to understand a simple request?', 'Use a language they know well.'),
  q('understanding-show', 'Communicating', 24, 155, 'Is the request still hard when you show your child what you mean?', '', 'understanding'),
  q('words', 'Communicating', 18, 47, 'Are you worried about the words your child uses?', 'Think about all the languages your child uses. This is not a word-count test.'),
  q('speech-clear', 'Communicating', 36, 155, 'Do familiar people often find your child’s speech hard to understand?', 'Choose “Does not apply” if your child does not use speech.'),
  q('story', 'Communicating', 60, 155, 'Does your child find it hard to tell you about something that happened?', 'Let them use their usual way of communicating.'),
  q('baby-arms', 'Moving and using hands', 0, 11, 'Are you worried about how your baby moves their arms?'),
  q('baby-legs', 'Moving and using hands', 0, 11, 'Are you worried about how your baby moves their legs?'),
  q('movement', 'Moving and using hands', 12, 155, 'Are you worried about how your child moves around?', 'Consider any equipment or support they normally use.'),
  q('movement-falls', 'Moving and using hands', 24, 155, 'Does your child often fall during everyday activities?', 'Choose “Does not apply” if your child does not walk.'),
  q('hands', 'Moving and using hands', 12, 155, 'Does your child find it hard to pick up small objects?', 'Think about safe, age-appropriate play. Do not use objects that could cause choking.'),
  q('drawing', 'Moving and using hands', 48, 155, 'Does your child find drawing with a crayon difficult?', 'Include their usual grip aids. Choose “Does not apply” if they have not tried.'),
  q('dressing', 'Everyday routines', 36, 155, 'Are you worried about the help your child needs to get dressed?', 'Think about what is expected for their age, not whether they do it alone.'),
  q('toileting', 'Everyday routines', 48, 155, 'Are you worried about your child’s toilet routine?', 'There is no pass or fail age in this check-in.'),
  q('routine-steps', 'Everyday routines', 60, 155, 'Does your child find it hard to follow the steps of a familiar routine?', 'For example, getting ready to leave home.'),
  q('sound', 'Sounds, touch and change', 0, 155, 'Do everyday sounds often upset your child?', 'Think about ordinary sounds at a comfortable volume.'),
  q('sound-impact', 'Sounds, touch and change', 0, 155, 'Do these sounds stop your child from joining daily activities?', '', 'sound'),
  q('touch', 'Sounds, touch and change', 12, 155, 'Do clothing textures often bother your child?', 'For example, a label or seam.'),
  q('change', 'Sounds, touch and change', 24, 155, 'Does a small change in plans often upset your child?', 'Think about their usual response, not a single difficult day.'),
  q('change-settle', 'Sounds, touch and change', 24, 155, 'Is it hard for your child to settle after a change in plans?', '', 'change'),
  q('repeat', 'Sounds, touch and change', 24, 155, 'Does repeating the same activity make it hard for your child to move on?', 'Repetition by itself is not a problem. Think about difficulty moving to a needed activity.'),
  q('attention', 'Attention and activity', 36, 155, 'Does your child find it hard to stay with a short activity?', 'Compare with children of a similar age. Choose an activity they understand.'),
  q('attention-interest', 'Attention and activity', 36, 155, 'Does this also happen with an activity your child enjoys?', '', 'attention'),
  q('attention-places', 'Attention and activity', 36, 155, 'Has another caregiver noticed the same difficulty with attention?', 'Choose “Not sure” if you have not asked.', 'attention'),
  q('activity', 'Attention and activity', 36, 155, 'Does your child find it hard to stay seated when they need to?', 'Think about a brief activity that is reasonable for their age.'),
  q('waiting', 'Attention and activity', 36, 155, 'Does your child find waiting for a turn very difficult?', 'Compare with children of a similar age.'),
  q('impulse', 'Attention and activity', 36, 155, 'Does your child often act before checking if something is safe?', 'For example, running ahead near traffic.'),
  q('instructions', 'Attention and activity', 60, 155, 'Does your child often lose track of a task they have started?', 'Think about a task they already know how to do.'),
  q('reading', 'Learning', 72, 155, 'Are you worried about your child’s reading?', 'Choose “Does not apply” if they have not had reading lessons.'),
  q('writing', 'Learning', 72, 155, 'Are you worried about your child’s writing?', 'Consider the language used for teaching.'),
  q('numbers', 'Learning', 72, 155, 'Are you worried about your child’s understanding of numbers?'),
  q('learning-remember', 'Learning', 72, 155, 'Does your child find it hard to remember something they have just practised?'),
  q('school-distress', 'Learning', 72, 155, 'Does schoolwork often leave your child upset?', 'Choose “Does not apply” if they do not do schoolwork.'),
  q('sleep-start', 'Sleep, meals and comfort', 0, 155, 'Are you worried about how your child settles to sleep?', 'Sleep patterns vary with age.'),
  q('sleep-wake', 'Sleep, meals and comfort', 0, 155, 'Are you worried about how often your child wakes during sleep?'),
  q('feeding', 'Sleep, meals and comfort', 0, 11, 'Are you worried about your baby’s feeding?'),
  q('food-range', 'Sleep, meals and comfort', 12, 155, 'Are you worried about how few foods your child accepts?'),
  q('food-texture', 'Sleep, meals and comfort', 12, 155, 'Does your child avoid foods because of how they feel in the mouth?', '', 'food-range'),
  q('pain', 'Sleep, meals and comfort', 0, 155, 'Does your child often seem to be in pain?', 'Pain needs medical advice; this check-in cannot explain its cause.'),
  q('constipation', 'Sleep, meals and comfort', 0, 155, 'Does your child often have difficulty passing stool?', 'This is a physical comfort question, not a sign of autism.'),
  q('other', 'Anything else', 0, 155, 'Is there another concern you want to discuss with your child’s doctor?'),
];
export const labels: Record<Answer, string> = { yes: 'Yes', no: 'No', unsure: 'Not sure', na: 'Does not apply' };
export function activeQuestions(months: number, answers: Record<string, Answer>) {
  const active = new Set<string>();
  return questions.filter(q => {
    const included = months >= q.min && months <= q.max && (!q.parent || active.has(q.parent) && ['yes', 'unsure'].includes(answers[q.parent]));
    if (included) active.add(q.id);
    return included;
  });
}
export function pruneAnswers(months: number, answers: Record<string, Answer>) {
  const ids = new Set(activeQuestions(months, answers).map(q => q.id));
  return Object.fromEntries(Object.entries(answers).filter(([id, value]) => ids.has(id) && Object.hasOwn(labels, value))) as Record<string, Answer>;
}
export function hasSkillLoss(answers: Record<string, Answer>) { return questions.some(q => q.urgent && answers[q.id] === 'yes'); }
export function nextStep(answers: Record<string, Answer>) {
  if (hasSkillLoss(answers)) return 'You noticed a skill your child has lost. Contact your child’s doctor promptly and explain what changed. You do not need to finish this check-in before seeking advice.';
  if (Object.values(answers).includes('yes')) return 'You noticed some difficulties. Share these observations with your child’s doctor. They can help you decide whether your child needs a closer look at their development.';
  if (Object.values(answers).includes('unsure')) return 'You were unsure about some answers. You can discuss these questions with your child’s doctor and ask what to look for.';
  if (Object.values(answers).includes('na')) return 'Some questions did not apply to your child. This summary covers only the questions you could answer. Speak with your child’s doctor about any concerns.';
  return 'You did not report difficulties in these questions. This does not rule out a developmental concern. Keep attending routine check-ups and speak with your child’s doctor if something worries you.';
}
