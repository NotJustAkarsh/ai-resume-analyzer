const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');
const interviewReportSchema = z.object({
  matchScore: z.number().describe('A score between 0 to 100'),
  tasks: z.array(z.string('Some msg'))
});
console.log(JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2));
