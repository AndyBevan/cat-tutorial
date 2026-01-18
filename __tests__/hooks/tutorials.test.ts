import {
  getTutorialBySlug,
  getAllTutorialSlugs,
  tutorials,
} from '@/data/tutorials';
import { catCountingTutorial } from '@/data/tutorials/cat-counting';

describe('Tutorial Data Helpers', () => {
  describe('tutorials array', () => {
    it('should contain at least one tutorial', () => {
      expect(tutorials.length).toBeGreaterThanOrEqual(1);
    });

    it('should include the cat-counting tutorial', () => {
      const catCounting = tutorials.find((t) => t.id === 'cat-counting');
      expect(catCounting).toBeDefined();
      expect(catCounting).toEqual(catCountingTutorial);
    });

    it('should have tutorials with valid structure', () => {
      tutorials.forEach((tutorial) => {
        expect(tutorial.id).toBeDefined();
        expect(tutorial.title).toBeDefined();
        expect(tutorial.description).toBeDefined();
        expect(tutorial.difficulty).toBeDefined();
        expect(tutorial.steps).toBeDefined();
        expect(tutorial.steps.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('should have tutorials with URL-safe slugs', () => {
      tutorials.forEach((tutorial) => {
        expect(tutorial.id).toMatch(/^[a-z0-9-]+$/);
      });
    });
  });

  describe('getTutorialBySlug', () => {
    it('should return tutorial when slug exists', () => {
      const tutorial = getTutorialBySlug('cat-counting');

      expect(tutorial).toBeDefined();
      expect(tutorial?.id).toBe('cat-counting');
      expect(tutorial?.title).toBe('Count the Cats');
    });

    it('should return undefined for non-existent slug', () => {
      const tutorial = getTutorialBySlug('non-existent-tutorial');

      expect(tutorial).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const tutorial = getTutorialBySlug('');

      expect(tutorial).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const tutorial = getTutorialBySlug('Cat-Counting');

      expect(tutorial).toBeUndefined();
    });
  });

  describe('getAllTutorialSlugs', () => {
    it('should return an array of slugs', () => {
      const slugs = getAllTutorialSlugs();

      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.length).toBeGreaterThanOrEqual(1);
    });

    it('should include cat-counting slug', () => {
      const slugs = getAllTutorialSlugs();

      expect(slugs).toContain('cat-counting');
    });

    it('should return slugs that match tutorial IDs', () => {
      const slugs = getAllTutorialSlugs();

      slugs.forEach((slug) => {
        const tutorial = getTutorialBySlug(slug);
        expect(tutorial).toBeDefined();
        expect(tutorial?.id).toBe(slug);
      });
    });

    it('should return the same number of slugs as tutorials', () => {
      const slugs = getAllTutorialSlugs();

      expect(slugs.length).toBe(tutorials.length);
    });

    it('should return unique slugs only', () => {
      const slugs = getAllTutorialSlugs();
      const uniqueSlugs = Array.from(new Set(slugs));

      expect(slugs.length).toBe(uniqueSlugs.length);
    });
  });

  describe('Tutorial extensibility', () => {
    it('should support adding new tutorials to the array', () => {
      // This test verifies the data structure supports extensibility
      // by checking that the tutorials array can be iterated
      // and each tutorial conforms to the expected structure
      const tutorialIds = tutorials.map((t) => t.id);

      expect(Array.isArray(tutorialIds)).toBe(true);
      tutorialIds.forEach((id) => {
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
      });
    });

    it('should have tutorials with sequential step numbers starting at 1', () => {
      tutorials.forEach((tutorial) => {
        tutorial.steps.forEach((step, index) => {
          expect(step.number).toBe(index + 1);
        });
      });
    });
  });
});
