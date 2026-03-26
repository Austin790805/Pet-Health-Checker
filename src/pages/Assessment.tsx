import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Upload, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function Assessment() {
  const { t } = useTranslation();
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [petType, setPetType] = useState('dog');
  const [symptoms, setSymptoms] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImageURL(url);
      setResults(null);
    }
  };

  const analyzeHealth = async () => {
    if (!model || !imageRef.current || !symptoms) return;
    
    setAnalyzing(true);
    try {
      // 1. Image Classification (TFJS)
      const predictions = await model.classify(imageRef.current);
      const topPrediction = predictions[0];
      
      // 2. Rule-based Logic combining Image + Symptoms
      const symptomList = symptoms.toLowerCase();
      let condition = "General Malaise";
      let severity = "low";
      let homeCare = ["Ensure access to fresh water", "Monitor for 24 hours", "Provide a quiet resting place"];
      let vetVisit = false;

      // Simple rule-based logic
      if (symptomList.includes('vomit') || symptomList.includes('diarrhea')) {
        condition = "Gastrointestinal Upset";
        severity = "medium";
        homeCare = ["Withhold food for 12-24 hours", "Offer small amounts of water frequently"];
        if (symptomList.includes('blood') || symptomList.includes('lethargic')) {
          severity = "high";
          vetVisit = true;
        }
      } else if (symptomList.includes('cough') || symptomList.includes('sneeze')) {
        condition = "Respiratory Infection";
        severity = "medium";
        homeCare = ["Keep warm and dry", "Wipe discharge from eyes/nose"];
        vetVisit = true;
      } else if (symptomList.includes('scratch') || symptomList.includes('itch')) {
        condition = "Skin Allergy / Parasites";
        severity = "low";
        homeCare = ["Check for fleas/ticks", "Use pet-safe soothing shampoo"];
      } else if (symptomList.includes('limp') || symptomList.includes('pain')) {
        condition = "Musculoskeletal Injury";
        severity = "medium";
        homeCare = ["Strict rest", "Do not give human pain medication"];
        vetVisit = true;
      }

      setResults({
        imageAnalysis: topPrediction.className,
        confidence: (topPrediction.probability * 100).toFixed(1),
        condition,
        severity,
        homeCare,
        vetVisit
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity className="h-6 w-6 text-indigo-600" />
          {t('assessment')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('pet_type')}</label>
              <select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              >
                <option value="dog">{t('dog')}</option>
                <option value="cat">{t('cat')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('upload_image')}</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              </div>
              {imageURL && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-200">
                  <img ref={imageRef} src={imageURL} alt="Pet" className="w-full h-48 object-cover" crossOrigin="anonymous" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('symptoms')}</label>
              <textarea
                rows={4}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md border p-3"
                placeholder="E.g., vomiting, lethargy, not eating..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <button
              onClick={analyzeHealth}
              disabled={!model || !imageURL || !symptoms || analyzing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {analyzing ? t('analyzing') : t('analyze')}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-medium text-slate-900 mb-4">{t('results')}</h3>
            
            {!results ? (
              <div className="text-center text-slate-500 py-12">
                <Activity className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p>Upload an image and describe symptoms to see the analysis.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <p className="text-sm text-slate-500">Image Analysis (TFJS)</p>
                  <p className="font-medium text-slate-900 capitalize">{results.imageAnalysis}</p>
                  <p className="text-xs text-slate-400 mt-1">{t('confidence')}: {results.confidence}%</p>
                </div>

                <div className={`p-4 rounded-lg border ${results.severity === 'high' ? 'bg-red-50 border-red-200' : results.severity === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                  <h4 className="font-semibold text-slate-900 mb-1">{t('probable_condition')}</h4>
                  <p className="text-lg">{results.condition}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    {t('home_care')}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {results.homeCare.map((care: string, idx: number) => (
                      <li key={idx}>{care}</li>
                    ))}
                  </ul>
                </div>

                {results.vetVisit && (
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-200 flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-rose-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-rose-900">{t('vet_visit')}</h4>
                      <p className="text-sm text-rose-700 mt-1">Based on the symptoms, we strongly recommend visiting a veterinarian as soon as possible.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-100 rounded-lg text-sm text-slate-600 text-center">
          {t('disclaimer')}
        </div>
      </div>
    </div>
  );
}
