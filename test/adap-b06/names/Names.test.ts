import { describe, it, expect, beforeEach } from 'vitest';
import { StringName } from '../../../src/adap-b06/names/StringName';
import { StringArrayName } from '../../../src/adap-b06/names/StringArrayName';
import { IllegalArgumentException } from '../../../src/adap-b06/common/IllegalArgumentException';

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
            const newName = name.append("com");
            expect(newName.getNoComponents()).toBe(4);
            expect(newName.getComponent(3)).toBe("com");
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
            const newName= name.setComponent(0, "www");
            expect(newName.getNoComponents()).toBe(initialCount);
            expect(newName.getComponent(0)).toBe("www");
        });

        it('should handle basic operations correctly', () => {
            const newName = name.append("de");
            expect(newName.getNoComponents()).toBe(3);
            const veryNewName = newName.remove(0);
            expect(veryNewName.getNoComponents()).toBe(2);
        });
    });

    describe("Equality Contract Tests", () => {

        const stringNameExample = new StringName("oss.fau.de", ".");
        const stringArrayNameExample = new StringArrayName(["oss", "fau", "de"], ".");
    
        describe("StringName Equality Contract", () => {
    
            describe("Reflexive", () => {
                it("should return true for the same instance", () => {
                    expect(stringNameExample.equals(stringNameExample)).toBe(true);
                });
            });
    
            describe("Symmetric", () => {
                it("should return true for two equal StringName instances, both ways", () => {
                    const name2 = new StringName("oss.fau.de", ".");
                    expect(stringNameExample.equals(name2)).toBe(true);
                    expect(name2.equals(stringNameExample)).toBe(true);
                });
    
                it("should return false for two different StringName instances, both ways", () => {
                    const name2 = new StringName("example.com", ".");
                    expect(stringNameExample.equals(name2)).toBe(false);
                    expect(name2.equals(stringNameExample)).toBe(false);
                });
            });
    
            describe("Transitive", () => {
                it("should return true if A == B and B == C, then A == C", () => {
                    const name2 = new StringName("oss.fau.de", ".");
                    const name3 = new StringName("oss.fau.de", ".");
                    expect(stringNameExample.equals(name2)).toBe(true);
                    expect(name2.equals(name3)).toBe(true);
                    expect(stringNameExample.equals(name3)).toBe(true);
                });
            });
    
            describe("Null-Object", () => {
                it("should return false when compared to null", () => {
                    expect(stringNameExample.equals(null)).toBe(false);
                });
            });
    
        });
    
        describe("StringArrayName Equality Contract", () => {
    
            describe("Symmetric", () => {
                it("should return true for two equal StringArrayName instances, both ways", () => {
                    const name2 = new StringArrayName(["oss", "fau", "de"], ".");
                    expect(stringArrayNameExample.equals(name2)).toBe(true);
                    expect(name2.equals(stringArrayNameExample)).toBe(true);
                });
    
                it("should return false for two different StringArrayName instances, both ways", () => {
                    const name2 = new StringArrayName(["example", "com"], ".");
                    expect(stringArrayNameExample.equals(name2)).toBe(false);
                    expect(name2.equals(stringArrayNameExample)).toBe(false);
                });
            });
    
            describe("Transitive", () => {
                it("should return true if A == B and B == C, then A == C", () => {
                    const name2 = new StringArrayName(["oss", "fau", "de"], ".");
                    const name3 = new StringArrayName(["oss", "fau", "de"], ".");
                    expect(stringArrayNameExample.equals(name2)).toBe(true);
                    expect(name2.equals(name3)).toBe(true);
                    expect(stringArrayNameExample.equals(name3)).toBe(true);
                });
            });
    
            describe("Consistent", () => {
                it("should consistently return true for repeated equal comparisons", () => {
                    const name2 = new StringArrayName(["oss", "fau", "de"], ".");
                    for (let i = 0; i < 10; i++) {
                        expect(stringArrayNameExample.equals(name2)).toBe(true);
                    }
                });
    
                it("should consistently return false for repeated unequal comparisons", () => {
                    const name2 = new StringArrayName(["example", "com"], ".");
                    for (let i = 0; i < 10; i++) {
                        expect(stringArrayNameExample.equals(name2)).toBe(false);
                    }
                });
            });
    
        });
    
    });
});
