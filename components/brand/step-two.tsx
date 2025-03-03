'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Textarea from '@/components/ui/textarea';
import { StepTwoData } from '@/app/brand/types';

interface StepTwoProps {
  initialData?: Partial<StepTwoData>;
  onSubmit: (data: StepTwoData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function StepTwo({ initialData, onSubmit, onBack, isSubmitting }: StepTwoProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<StepTwoData>({
    defaultValues: {
      about_brand: initialData?.about_brand || '',
      social_media: initialData?.social_media || [{ name: '', link: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social_media',
  });

  const handleFormSubmit = (data: StepTwoData) => {
    // Filter out empty social media entries
    data.social_media = data.social_media.filter(item => item.name && item.link);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Additional Brand Information</h2>
      <p className="text-gray-600">Step 2 of 2: Tell us more about your brand</p>
      
      <Controller
        name="about_brand"
        control={control}
        rules={{ required: 'Brand description is required' }}
        render={({ field }) => (
          <Textarea
            label="About Brand"
            placeholder="Describe your brand..."
            error={errors.about_brand?.message}
            rows={4}
            {...field}
          />
        )}
      />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            Social Media
          </label>
          <Button 
            type="button" 
            variant="secondary" 
            size="sm"
            onClick={() => append({ name: '', link: '' })}
          >
            Add Social
          </Button>
        </div>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-start">
            <div className="flex-1">
              <Controller
                name={`social_media.${index}.name`}
                control={control}
                rules={{ required: 'Platform name is required' }}
                render={({ field }) => (
                  <Input
                    placeholder="Platform (e.g. Twitter)"
                    error={errors.social_media?.[index]?.name?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name={`social_media.${index}.link`}
                control={control}
                rules={{ required: 'URL is required' }}
                render={({ field }) => (
                  <Input
                    placeholder="URL"
                    error={errors.social_media?.[index]?.link?.message}
                    {...field}
                  />
                )}
              />
            </div>
            {index > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-1"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          isLoading={isSubmitting}
          className="min-w-[120px]"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}