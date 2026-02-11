import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiRequest } from './utils/api';
import TextInput from './form/TextInput';
import NumberInput from './form/NumberInput';
import CheckboxInput from './form/CheckboxInput';
import Button from './buttons/Button';
import SpaceBtn from './buttons/SpaceBtn';

function CharacterForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [currentStep, setCurrentStep] = useState(1);
  const [character, setCharacter] = useState({
    name: '',
    height: 0,
    species: '',
    homeworld: '',
    affiliation: '',
    stats: {
      forceRating: 0,
      combatSkill: 0,
      pilotingAbility: 0,
      diplomacyRating: 0,
    },
    weapons: [],
    vehicles: [],
    isJedi: false,
    apprentices: [],
    master: '',
    notableAchievements: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const TOTAL_STEPS = 4;

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Name, species, origin' },
    { id: 2, title: 'Stats', description: 'Force, combat, skills' },
    { id: 3, title: 'Relationships', description: 'Master, apprentices' },
    { id: 4, title: 'Equipment', description: 'Weapons, vehicles' },
  ];

  useEffect(() => {
    if (isEditing) {
      const fetchCharacterData = async () => {
        setLoading(true);
        try {
          const data = await apiRequest('GET', `/characters/${id}`);
          setCharacter((prev) => ({
            ...prev,
            ...data,
            stats: { ...prev.stats, ...data.stats },
          }));
        } catch {
          setError('Failed to load character data.');
        } finally {
          setLoading(false);
        }
      };
      fetchCharacterData();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [field, subfield] = name.split('.');

    if (type === 'checkbox') {
      setCharacter((prev) => ({ ...prev, [name]: checked }));
    } else if (subfield) {
      setCharacter((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: type === 'number' ? parseFloat(value) || 0 : value,
        },
      }));
    } else if (
      ['weapons', 'vehicles', 'apprentices', 'notableAchievements'].includes(
        name
      )
    ) {
      // Handle array fields - convert comma-separated string to array
      const arrayValue =
        value.trim() === '' ? [] : value.split(',').map((item) => item.trim());
      setCharacter((prev) => ({
        ...prev,
        [name]: arrayValue,
      }));
    } else {
      setCharacter((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!character.name.trim()) return 'Name is required';
        if (!character.species.trim()) return 'Species is required';
        return null;
      case 2:
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  };

  const handlePrevious = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    const method = isEditing ? 'PUT' : 'POST';
    const endpoint = isEditing ? `/characters/${id}` : '/characters';

    try {
      await apiRequest(method, endpoint, character);
      navigate('/characters');
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const renderStepIndicator = () => (
    <div className='flex justify-between mb-8'>
      {steps.map((step) => (
        <div key={step.id} className='flex flex-col items-center flex-1'>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              step.id === currentStep
                ? 'bg-yellow-500 text-neutral-900'
                : step.id < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-neutral-700 text-neutral-400'
            }`}
          >
            {step.id < currentStep ? '✓' : step.id}
          </div>
          <span
            className={`text-xs mt-2 text-center ${
              step.id === currentStep ? 'text-yellow-400' : 'text-neutral-400'
            }`}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-4'>
            <h3 className='text-xl text-yellow-400 font-bold mb-4 font-dune'>
              Basic Information
            </h3>
            <TextInput
              label='Name *'
              name='name'
              value={character.name}
              onChange={handleChange}
              placeholder='Character Name'
            />
            <TextInput
              label='Species *'
              name='species'
              value={character.species}
              onChange={handleChange}
              placeholder='Species'
            />
            <TextInput
              label='Home World'
              name='homeworld'
              value={character.homeworld}
              onChange={handleChange}
              placeholder='Homeworld'
            />
            <TextInput
              label='Affiliation'
              name='affiliation'
              value={character.affiliation}
              onChange={handleChange}
              placeholder='Affiliation'
            />
            <NumberInput
              label='Height (cm)'
              name='height'
              value={character.height}
              onChange={handleChange}
              placeholder='Height (cm)'
            />
          </div>
        );

      case 2:
        return (
          <div className='space-y-4'>
            <h3 className='text-xl text-yellow-400 font-bold mb-4 font-dune'>
              Character Stats
            </h3>
            <NumberInput
              label='Force Rating (0-100)'
              name='stats.forceRating'
              value={character.stats.forceRating}
              onChange={handleChange}
              placeholder='Force Rating'
            />
            <NumberInput
              label='Combat Skill (0-100)'
              name='stats.combatSkill'
              value={character.stats.combatSkill}
              onChange={handleChange}
              placeholder='Combat Skill'
            />
            <NumberInput
              label='Piloting Ability (0-100)'
              name='stats.pilotingAbility'
              value={character.stats.pilotingAbility}
              onChange={handleChange}
              placeholder='Piloting Ability'
            />
            <NumberInput
              label='Diplomacy Rating (0-100)'
              name='stats.diplomacyRating'
              value={character.stats.diplomacyRating}
              onChange={handleChange}
              placeholder='Diplomacy Rating'
            />
            <CheckboxInput
              label='Is Jedi ?'
              name='isJedi'
              checked={character.isJedi}
              onChange={handleChange}
              className='mb-2 p-2 w-full'
            />
          </div>
        );

      case 3:
        return (
          <div className='space-y-4'>
            <h3 className='text-xl text-yellow-400 font-bold mb-4 font-dune'>
              Relationships
            </h3>
            <TextInput
              label='Master'
              name='master'
              value={character.master}
              onChange={handleChange}
              placeholder='Master'
            />
            <div>
              <label className='block text-left text-sm font-semibold text-red-500 mb-1'>
                Apprentices (comma-separated)
              </label>
              <input
                type='text'
                name='apprentices'
                value={
                  Array.isArray(character.apprentices)
                    ? character.apprentices.join(', ')
                    : ''
                }
                onChange={handleChange}
                placeholder='Apprentices (comma separated)'
                className='p-2 w-full bg-neutral-800/50 border border-neutral-600 rounded text-white'
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className='space-y-4'>
            <h3 className='text-xl text-yellow-400 font-bold mb-4 font-dune'>
              Equipment & Achievements
            </h3>
            <div>
              <label className='block text-left text-sm font-semibold text-red-500 mb-1'>
                Weapons (comma-separated)
              </label>
              <input
                type='text'
                name='weapons'
                value={
                  Array.isArray(character.weapons)
                    ? character.weapons.join(', ')
                    : ''
                }
                onChange={handleChange}
                placeholder='Weapons (comma separated)'
                className='p-2 w-full bg-neutral-800/50 border border-neutral-600 rounded text-white'
              />
            </div>
            <div>
              <label className='block text-left text-sm font-semibold text-red-500 mb-1'>
                Vehicles (comma-separated)
              </label>
              <input
                type='text'
                name='vehicles'
                value={
                  Array.isArray(character.vehicles)
                    ? character.vehicles.join(', ')
                    : ''
                }
                onChange={handleChange}
                placeholder='Vehicles (comma separated)'
                className='p-2 w-full bg-neutral-800/50 border border-neutral-600 rounded text-white'
              />
            </div>
            <div>
              <label className='block text-left text-sm font-semibold text-red-500 mb-1'>
                Notable Achievements (comma-separated)
              </label>
              <input
                type='text'
                name='notableAchievements'
                value={
                  Array.isArray(character.notableAchievements)
                    ? character.notableAchievements.join(', ')
                    : ''
                }
                onChange={handleChange}
                placeholder='Notable Achievements (comma separated)'
                className='p-2 w-full bg-neutral-800/50 border border-neutral-600 rounded text-white'
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className='text-center mt-14 text-neutral-200'>
        Loading character data...
      </div>
    );

  return (
    <div className='text-center bg-neutral-800/5 backdrop-blur-sm p-6 rounded-xl shadow-2xl mt-14 w-full max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-2xl text-red-600 font-bold mb-2'>
          {isEditing ? 'Edit Character' : 'Add New Character'}
        </h2>
        <p className='text-neutral-400 text-sm mb-6'>
          Step {currentStep} of {TOTAL_STEPS}:{' '}
          {steps[currentStep - 1].description}
        </p>

        {error && (
          <div className='text-red-500 mb-4 p-3 bg-red-900/20 rounded-lg'>
            {error}
          </div>
        )}

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className='mb-6'>{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-6'>
          <Button
            type='button'
            onClick={
              currentStep === 1 ? () => navigate('/characters') : handlePrevious
            }
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <SpaceBtn type='button' onClick={handleNext} white>
              Next
            </SpaceBtn>
          ) : (
            <SpaceBtn type='submit' white disabled={saving}>
              {saving
                ? 'Saving...'
                : isEditing
                  ? 'Update Character'
                  : 'Create Character'}
            </SpaceBtn>
          )}
        </div>
      </form>
    </div>
  );
}

export default CharacterForm;
