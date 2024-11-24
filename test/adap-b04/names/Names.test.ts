import { describe, it, expect, beforeEach } from 'vitest';
import { StringName } from './StringName';
import { StringArrayName } from './StringArrayName';
import { IllegalArgumentException } from '../common/IllegalArgumentException';
import { InvalidStateException } from '../common/InvalidStateException';

describe('Name Implementation Tests', () => {
    describe('StringName Contract Tests', () => {
        let name: StringName;

        beforeEach(() => {
            name = new StringName("oss.fau.de", ".");
        });

        it('should throw on invalid constructor arguments', () => {
            expect(() => new StringName(null!)).toThrow(IllegalArgumentException);
        });

        it('should maintain invariant after operations', () => {
            name.append("com");
            expect(name.getNoComponents()).toBe(3);
            expect(name.getComponent(2)).toBe("com");
        });

        it('should throw on invalid operations', () => {
            expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
            expect(() => name.setComponent(0, null!)).toThrow(IllegalArgumentException);
            expect(() => name.remove(5)).toThrow(IllegalArgumentException);
        });
    });

    describe('StringArrayName Contract Tests', () => {
        let name: StringArrayName;

        beforeEach(() => {
            name = new StringArrayName(["oss", "fau"], ".");
        });

        it('should throw on invalid constructor arguments', () => {
            expect(() => new StringArrayName(null!)).toThrow(IllegalArgumentException);
            expect(() => new StringArrayName([null!])).toThrow(IllegalArgumentException);
        });

        it('should maintain state after modifications', () => {
            const initialCount = name.getNoComponents();
            name.setComponent(0, "www");
            expect(name.getNoComponents()).toBe(initialCount);
            expect(name.getComponent(0)).toBe("www");
        });

        it('should handle basic operations correctly', () => {
            name.append("de");
            expect(name.getNoComponents()).toBe(3);
            name.remove(0);
            expect(name.getNoComponents()).toBe(2);
        });
    });
});
