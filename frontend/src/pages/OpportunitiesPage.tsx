import React, { useState, useEffect } from 'react';
import { Opportunity } from '../types';
import { opportunitiesApi } from '../api/client';
import { OpportunityCard } from '../components/OpportunityCard';
import { ApplyModal } from '../components/ApplyModal';
import { EligibilityModal } from '../components/EligibilityModal';
import { Skeleton } from '../components/Skeleton';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [workMode, setWorkMode] = useState('All');
  const [minCgpa, setMinCgpa] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState('match');

  // Modals
  const [selectedOppForApply, setSelectedOppForApply] = useState<Opportunity | null>(null);
  const [selectedOppForElig, setSelectedOppForElig] = useState<Opportunity | null>(null);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await opportunitiesApi.list({
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        work_mode: workMode !== 'All' ? workMode : undefined,
        min_cgpa: minCgpa,
        sort,
        page,
        page_size: 9,
      });
      setOpportunities(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (err) {
      console.warn('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [page, category, workMode, minCgpa, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchOpportunities();
  };

  const categories = [
    'All',
    'Cybersecurity',
    'Cloud',
    'AI / ML',
    'Web Development',
    'Linux & Core',
  ];

  return (
    <div className="container" style={{ padding: 'clamp(24px, 4vw, 40px) 16px 80px', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span className="section-tag" style={{ fontSize: 10 }}>OPPORTUNITY DISCOVERY</span>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff' }}>
          Find work worth growing for.
        </h1>
        <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>
          Curated internships matched against your academic metrics, skills, and graduation batch.
        </p>
      </div>

      {/* Toolbar: Search + Category Pills + Selects */}
      <div
        className="glass-panel"
        style={{
          padding: 'clamp(14px, 3vw, 20px)',
          marginBottom: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search roles, companies, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: 38, fontSize: 13.5 }}
            />
            <Search
              size={16}
              color="#64748b"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                }}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px', flexShrink: 0 }}>
            Search
          </button>
        </form>

        {/* Swipeable Sector Pills on Mobile */}
        <div className="scroll-pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                border: category === cat ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.08)',
                background: category === cat ? 'rgba(0,242,254,0.15)' : 'rgba(255,255,255,0.03)',
                color: category === cat ? '#00f2fe' : '#94a3b8',
                transition: 'all 0.15s ease',
              }}
            >
              {cat === 'All' ? 'All Sectors' : cat}
            </button>
          ))}
        </div>

        {/* Mode & Sort Selects */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          <select
            className="form-select"
            value={workMode}
            onChange={(e) => {
              setWorkMode(e.target.value);
              setPage(1);
            }}
            style={{ padding: '8px 12px', fontSize: 13, minHeight: 38 }}
          >
            <option value="All">All Modes</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>

          <select
            className="form-select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            style={{ padding: '8px 12px', fontSize: 13, minHeight: 38 }}
          >
            <option value="match">Sort: Highest Match</option>
            <option value="stipend">Sort: Highest Stipend</option>
            <option value="deadline">Sort: Urgent Deadline</option>
            <option value="newest">Sort: Recently Added</option>
          </select>
        </div>
      </div>

      {/* Grid Mount */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} height={260} borderRadius={18} />
          ))}
        </div>
      ) : opportunities.length > 0 ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 36 }}>
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onApply={(o) => setSelectedOppForApply(o)}
                onCheckEligibility={(o) => setSelectedOppForElig(o)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span style={{ fontSize: 12.5, color: '#94a3b8' }}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong> ({total} total)
              </span>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div
          className="glass-panel"
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            color: '#94a3b8',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
          <h3 style={{ fontSize: 17, color: '#fff', marginBottom: 4 }}>No opportunities found</h3>
          <p style={{ fontSize: 13.5 }}>Try adjusting your search terms or filter constraints.</p>
        </div>
      )}

      {/* Modals */}
      <ApplyModal
        isOpen={!!selectedOppForApply}
        onClose={() => setSelectedOppForApply(null)}
        opportunity={selectedOppForApply}
        onSuccess={fetchOpportunities}
      />

      <EligibilityModal
        isOpen={!!selectedOppForElig}
        onClose={() => setSelectedOppForElig(null)}
        opportunity={selectedOppForElig}
        onApplyNow={(opp) => {
          setSelectedOppForElig(null);
          setSelectedOppForApply(opp);
        }}
      />
    </div>
  );
};
